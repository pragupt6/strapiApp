/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, LoginIcon } from '@heroicons/react/outline'
// import { LoginIcon } from '@heroicons/react'
import Link from 'next/link'
import AuthContext from '@/context/AuthContext'
const navigation = [
    { name: 'Dashboard', href: '/', current: true },
    { name: 'About Us', href: '/About', current: false }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Header = () => {
    const { user, logout } = useContext(AuthContext)
    console.log(`user=>`, user)
    return (
        <Disclosure as="nav" className="tw-bg-gray-800 tw-mb-10">
            {({ open }) => (
                <>
                    <div className="tw-mx-auto tw-px-2 sm:tw-px-6 lg:tw-px-8">
                        <div className="tw-relative tw-flex tw-items-center tw-justify-between tw-h-16">
                            <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center sm:tw-hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="tw-inline-flex tw-items-center tw-justify-center tw-p-2 tw-rounded-md tw-text-gray-400 hover:tw-text-white hover:tw-bg-gray-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-inset focus:tw-ring-white">
                                    <span className="tw-sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="tw-block tw-h-6 tw-w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="tw-block tw-h-6 tw-w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="tw-flex-1 tw-flex tw-items-center tw-justify-center sm:tw-items-stretch sm:tw-justify-start">
                                <div className="tw-flex-shrink-0 tw-flex tw-items-center">

                                    <div className="tw-block lg:tw-hidden tw-h-8 tw-w-auto tw-text-white tw-text-2xl tw-font-extralight">
                                        The Wall Art
                                    </div>

                                    <div className="tw-hidden lg:tw-block tw-h-8 tw-w-auto tw-text-white tw-text-2xl tw-font-extralight">
                                        The Wall Art
                                    </div>



                                    {/* <img
                                        className="block lg:hidden h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                        alt="Workflow"
                                    />
                                    <img
                                        className="hidden lg:block h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                        alt="Workflow"
                                    /> */}
                                </div>
                                <div className="tw-hidden sm:tw-block sm:tw-ml-6">
                                    <div className="tw-flex tw-space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                href={item.href}
                                                key={item.name}
                                            >
                                                <a
                                                    key={item.name}
                                                    href={'#'}
                                                    className={classNames(
                                                        item.current ? 'tw-bg-gray-900 tw-text-white' : 'tw-text-gray-300 hover:tw-bg-gray-700 hover:tw-text-white',
                                                        'tw-px-3 tw-py-2 tw-rounded-md tw-text-sm tw-font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                    onClick={(e) => {
                                                        item.current = true;
                                                        navigation.filter(nav => nav.name != item.name).map(fNav => fNav.current = false)
                                                    }}
                                                >
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {!user && <Link href="/auth/login"><a className="tw-whitespace-nowrap tw-inline-flex tw-rounded-md tw-bg-gray-600 tw-py-2 tw-px-3 tw-font-semibold tw-uppercase tw-text-blue-500 hover:tw-bg-opacity-90" >LOGIN&nbsp;&nbsp;<LoginIcon className="tw-block tw-h-6 tw-w-6" aria-hidden="true" /></a></Link>}
                            {user && <div className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-2 sm:tw-static sm:tw-inset-auto sm:tw-ml-6 sm:tw-pr-0">
                                <button className="tw-bg-gray-800 tw-p-1 tw-rounded-full tw-text-gray-400 hover:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800 focus:tw-ring-white">
                                    <span className="tw-sr-only">View notifications</span>
                                    <BellIcon className="tw-h-6 tw-w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="tw-ml-3 tw-relative">
                                    {({ open }) => (
                                        <>
                                            <div>
                                                <Menu.Button className="tw-bg-gray-800 tw-flex tw-text-sm tw-rounded-full focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800 focus:tw-ring-white">
                                                    <span className="tw-sr-only">Open user menu</span>
                                                    <img
                                                        className="tw-h-8 tw-w-8 tw-rounded-full"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                        alt=""
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    static
                                                    className="tw-origin-top-right tw-absolute tw-right-0 tw-mt-2 tw-w-48 tw-rounded-md tw-shadow-lg tw-py-1 tw-bg-white tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none"
                                                >
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'tw-bg-gray-100' : '',
                                                                    'tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700'
                                                                )}
                                                            >
                                                                Your Profile
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'tw-bg-gray-100' : '',
                                                                    'tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700'
                                                                )}
                                                            >
                                                                Settings
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href='/cred/logout'
                                                                // onclick={alert('sign out clicked')}
                                                                className={classNames(
                                                                    active ? 'tw-bg-gray-100' : '',
                                                                    'tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700'
                                                                )}
                                                            >
                                                                Sign out
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </>
                                    )}
                                </Menu>
                            </div>}
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:tw-hidden">
                        <div className="tw-px-2 tw-pt-2 tw-pb-3 tw-space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'tw-bg-gray-900 tw-text-white' : 'tw-text-gray-300 hover:tw-bg-gray-700 hover:tw-text-white',
                                        'tw-block tw-px-3 tw-py-2 tw-rounded-md tw-text-base tw-font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Header
