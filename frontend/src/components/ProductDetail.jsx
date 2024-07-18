'use client';

import { useState } from 'react';
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/20/solid';
import { Radio, RadioGroup } from '@headlessui/react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import OfferList from './Offerlist';

const product = {
    name: 'Product 1',
    href: '#',
    price: '$220',
    description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae hic minima repellat aspernatur, itaque in dolores temporibus? Esse commodi quas temporibus, id a recusandae eius non nisi obcaecati deleniti animi.
    Nihil molestias aliquam, beatae cupiditate, pariatur porro, libero nisi provident qui in esse. Expedita, dolor architecto. At, fuga! Perferendis provident voluptatem exercitationem! Ipsum fuga sint tenetur. Quos ratione odit placeat?`,
    imageSrc: 'https://picsum.photos/200/300',
    imageAlt: 'product image',
    breadcrumbs: [
        { id: 1, name: 'Travel', href: '#' },
        { id: 2, name: 'Bags', href: '#' }
    ],
    sizes: [
        { name: '1', description: 'Side 1 ' },
        { name: '2', description: 'Side 2' }
    ]
};
const reviews = { average: 4, totalCount: 1624 };

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ProductDetail() {
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-12 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                {/* Product details */}
                <div className="lg:max-w-lg lg:self-start">
                    <div >
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>

                    <section aria-labelledby="information-heading" className="mt-4">
                        <h2 id="information-heading" className="sr-only">
                            Product information
                        </h2>

                        <div className="flex items-center">
                            <p className="text-lg text-gray-900 sm:text-xl">Bid: <span className="font-semibold">{product.price}</span></p>


                        </div>

                        <div className="mt-4 space-y-6">
                            <p className="text-base text-gray-500">{product.description}</p>
                        </div>
                    </section>
                </div>

                {/* Product image */}
                <div className="lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center self-center">
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg self-center">
                        <img alt={product.imageAlt} src={product.imageSrc} className="h-3/5 w-4/5 object-cover rounded-lg object-center" />
                    </div>
                </div>

                {/* Product form */}
                <div className="lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                    <section aria-labelledby="options-heading">

                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Add to bag
                                </button>
                            </div>
                            <div className="mt-6 text-center">
                                <a href="#" className="group inline-flex text-base font-medium">
                                    <ShieldCheckIcon
                                        aria-hidden="true"
                                        className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    />
                                    <span className="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>
                                </a>
                            </div>
                    </section>
                </div>
            </div>

            <div className='mx-auto w-4/5 px-4 sm:px-6 sm:py-12 '>
                <OfferList></OfferList>
            </div>
        </div>
    );
}
