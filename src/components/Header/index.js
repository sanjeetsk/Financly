import React, { useEffect } from 'react'
import './style.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';

function Header() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, loading]);

    function handleLogout() {
        try {
            signOut(auth).then(() => {
                // Sign-out successful.
                toast.success("Sign Out Successfully");
                navigate('/');
            }).catch((error) => {
                // An error happened.
                toast.error(error.message);
            });
        }
        catch (e) {
            toast.error(error);
        }
    }
    return (
        <div className='navbar'>
            <p className='logo'>
                Financly.
            </p>
            {
                user &&
                <div style={{display:"flex", alignItems:"center", gap:"0.75rem"}}>
                    <img 
                        src={user.photoURL ? user.photoURL : ''}
                        style={{borderRadius:"50%", height:"1.5rem", width:"1.5rem"}}
                    />
                    <p className='logo link' onClick={handleLogout}>Logout</p>
                </div>
            }

        </div>
    )
}

export default Header
