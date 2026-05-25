import { useState, type FC } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { themeConfig } from '../../../config/index';
import { Tooltip } from '../../ui/Tooltip';

const Login: FC = () => {
    const { logoUrl, templateName } = themeConfig;
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen dark:bg-surface-900 bg-surface-200'>
            <div className='w-sm md:w-md lg:w-lg flex flex-col items-center justify-center dark:bg-surface-800 bg-surface-50 p-4 rounded-lg shadow-soft'>
                <div className='flex items-center justify-center'>
                    <img src={logoUrl} alt="ecommerce-logo" className="w-10 h-10 mr-2" />
                    <h1 className='text-2xl font-bold text-brand-600 dark:text-brand-50'>{templateName} Admin</h1>
                </div>
                <div className='w-full my-5'>
                    <form method='post' className='flex flex-col justify-center items-center px-5'>
                        <div className='w-full flex flex-col'>
                            <label htmlFor='email' className='text-surface-900 dark:text-surface-50 mb-3'>Email</label>
                            <input type='email' name='email' placeholder='Email' id='email' className='w-full p-2 rounded-md border-2 border-surface-900 dark:border-surface-200 focus:outline-none focus:border-2 focus:dark:border-brand-600 dark:text-surface-200' />
                        </div>
                        <div className='w-full flex flex-col my-8 relative'>
                            <label htmlFor='password' className='text-surface-900 dark:text-surface-50 mb-3'>Password</label>
                            <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' id='password' className='w-full p-2 rounded-md border-2 border-surface-900 dark:border-surface-200 focus:outline-none focus:border-2 focus:dark:border-brand-600 dark:text-surface-200' />
                            <Tooltip content={showPassword ? "Hide password" : "Show password"} side="top">
                                <button
                                    type="button"
                                    className='absolute right-3 bottom-2.5 cursor-pointer dark:text-surface-200 text-surface-900 focus:outline-none hover:text-brand-600 dark:hover:text-brand-400 transition-colors'
                                    onClick={handleShowPassword}
                                    onMouseDown={(e) => e.preventDefault()}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeClosed className="w-5 h-5" />}
                                </button>
                            </Tooltip>
                        </div>
                        <button type='submit' className='w-full p-2 rounded-full text-xl text-surface-200 bg-brand-600 hover:bg-brand-500 cursor-pointer'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Login;