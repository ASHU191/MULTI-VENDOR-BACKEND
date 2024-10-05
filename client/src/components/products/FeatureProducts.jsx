// ... other imports
import React, { useEffect } from 'react';
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Ratings from '../Ratings';
import { add_to_card, messageClear, add_to_wishlist } from '../../store/reducers/cardReducer';

const FeatureProducts = ({ products }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { successMessage, errorMessage } = useSelector(state => state.card);

    const add_card = (id) => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity: 1,
                productId: id,
            }));
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [errorMessage, successMessage]);

    const add_wishlist = (pro) => {
        dispatch(add_to_wishlist({
            userId: userInfo.id,
            productId: pro._id,
            name: pro.name,
            price: pro.price,
            image: pro.images[0],
            discount: pro.discount,
            rating: pro.rating,
            slug: pro.slug,
        }));
    };

    return (
        <div className='w-[85%] flex flex-wrap mx-auto'>
            <div className='w-full'>
                <div className='text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-12'>
                    <h2>Featured Products</h2>
                    <div className='w-[100px] h-[4px] bg-[#7fad39] mt-4'></div>
                </div>
            </div>
            <div className='w-full grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6'>
                {
                    products.map((p, i) => (
                        <div key={i} className='group transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden bg-gradient-to-b from-white to-[#f9f9f9] transform hover:scale-105 border border-gray-200 relative'>
                            <div className='relative overflow-hidden'>
                                {/* Action Buttons positioned absolutely and vertically centered */}
                                <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10'>
                                    <li onClick={() => add_wishlist(p)} className='w-10 h-10 cursor-pointer flex justify-center items-center rounded-full bg-gray-100 hover:bg-[#7fad39] hover:text-white transition-all shadow-md'>
                                        <AiFillHeart />
                                    </li>
                                    <li onClick={() => add_card(p._id)} className='w-10 h-10 cursor-pointer flex justify-center items-center rounded-full bg-gray-100 hover:bg-[#7fad39] hover:text-white transition-all shadow-md'>
                                        <AiOutlineShoppingCart />
                                    </li>
                                </div>
                                {/* Discount Badge */}
                                {p.discount && (
                                    <div className='flex justify-center items-center absolute text-white w-8 h-8 rounded-full bg-red-500 font-semibold text-xs left-2 top-2 z-10'>
                                        {p.discount}%
                                    </div>
                                )}
                                {/* Product Image */}
                                <Link to={`/product/details/${p.slug}`}>
                                    <img className='w-full h-[180px] object-contain transition-transform duration-300 rounded-lg' src={p.images[0]} alt="product" />
                                </Link>
                            </div>
                            <div className='py-4 px-3 text-slate-600'>
                                <h2 className='text-lg font-semibold mb-2 text-left line-clamp-2'>{p.name}</h2>
                                <div className='flex justify-between items-center mb-2'>
                                    <div className='flex items-center gap-2'>
                                        {p.discount ? (
                                            <>
                                                <span className='text-lg font-bold text-green-600'>${(p.price - (p.price * p.discount / 100)).toFixed(2)}</span>
                                                <span className='text-sm font-bold text-gray-500 line-through'>${p.price.toFixed(2)}</span> {/* Changed to text-sm */}
                                            </>
                                        ) : (
                                            <span className='text-lg font-bold text-green-600'>${p.price.toFixed(2)}</span>
                                        )}
                                    </div>
                                    <div className='flex'>
                                        <Ratings ratings={p.rating} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FeatureProducts;
