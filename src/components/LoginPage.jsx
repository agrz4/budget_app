import React from 'react';
import { SignInButton } from "@clerk/clerk-react";

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo dan Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center">
              <i className="fas fa-wallet text-4xl brand-gradient"></i>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">BudgetTracker</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Take control of your finances
          </p>
        </div>

        {/* Login Card */}
        <div className="login-card mt-8 py-8 px-6 sm:px-10 rounded-xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Sign in to your account</h2>
            <p className="text-sm text-gray-500 mt-1">Welcome back! Please enter your details</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <SignInButton mode="modal">
              <button className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg 
                shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 cursor-pointer">
                Sign in to your account
              </button>
            </SignInButton>
          </div>

          {/* Social Login Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <SignInButton mode="modal">
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 
                    rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 
                    hover:bg-gray-50 transition duration-150 cursor-pointer">
                    <i className="fab fa-google text-red-500 mr-2"></i>
                    Google
                  </button>
                </SignInButton>
              </div>
              <div>
                <SignInButton mode="modal">
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-200 
                    rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 
                    hover:bg-gray-50 transition duration-150 cursor-pointer">
                    <i className="fab fa-apple text-gray-800 mr-2"></i>
                    Apple
                  </button>
                </SignInButton>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-6 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <i className="fas fa-shield-alt text-green-500 mr-1"></i>
            <span>Secure login</span>
          </div>
          <span>•</span>
          <div className="flex items-center">
            <i className="fas fa-lock text-green-500 mr-1"></i>
            <span>Privacy protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 