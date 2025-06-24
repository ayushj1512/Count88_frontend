"use client";

import React from "react";

interface AddressFormProps {
    form: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function AddressForm({ form, onChange }: AddressFormProps) {
    return (
        <div className="space-y-4">
            {/* Greeting */}
            <p className="text-center text-sm font-medium text-pink-600 mb-2">
                You are just a few steps away from being an artist ✨
            </p>

            {/* First + Last name */}
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={onChange}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={onChange}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            {/* Phone */}
            <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />

            {/* Email */}
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />

            {/* Address */}
            <textarea
                name="address"
                placeholder="Street Address"
                value={form.address}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                rows={3}
            />

            {/* City + State */}
            <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={onChange}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={onChange}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                />
            </div>

            {/* Pincode */}
            <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={onChange}
                pattern="\d{6}"
                maxLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
        </div>
    );
}
