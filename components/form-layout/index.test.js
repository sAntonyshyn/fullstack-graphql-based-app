import '@testing-library/jest-dom'

import {render, screen, fireEvent} from '@testing-library/react'
import FormLayout from '@/components/form-layout'
import { Routes } from "@/constants/routes";
import Link from "next/link";
import React from "react";

describe('FormLayout', () => {
    test('renders FormLayout component', () => {
        render(<FormLayout onSubmit={() => {}} helperText={<></>} />);

        expect(screen.getByText('Welcome to the site!')).toBeInTheDocument();
    });


    test('enables button when email and password are filled', () => {
        render(<FormLayout onSubmit={() => {}} helperText={<></>} />);
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(submitButton).toBeEnabled();
    });

    test('disables button when email or password is empty', () => {
        render(<FormLayout onSubmit={() => {}} helperText={<Link href={Routes.LOGIN} className="underline">Sign In</Link>} />);
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByText('Submit');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: '' } });

        expect(submitButton).toBeDisabled();
    });
})