import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LOGO, PROFILE_LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);



  const handleSignOut = () =>{
    signOut(auth).then(() => {

    }).catch((error) => {
      navigate("/error")
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
       const {uid, email, displayName} = user;
       dispatch(addUser({uid: uid, email:email, displayName: displayName}));
       navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  
  }, [])  
  
const handleGptSearchView = () =>{
  dispatch(toggleGptSearchView());


};

const handleLanguageChange = (e) =>{
  dispatch(changeLanguage(e.target.value));
}

  return (
    <div className=' absolute w-screen  px-5 py-3 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between '>
      <img className="w-44  mx-auto md:mx-0"
      src={LOGO}
      alt='logo'/>
     {user && (
      <div className='flex p-2 justify-between'>
      {showGPTSearch && (
        <select className='p-2 m-5 bg-gray-900 text-white rounded-sm' 
        onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>
             {lang.name}
            </option>

          ))}
        </select>
      )}
        <button  onClick={handleGptSearchView}
        className='py-2 px-3 mb:5 md:block mx-4 my-2 bg-purple-800 text-white rounded-lg cursor-pointer'>
          {showGPTSearch? "HomePage" :"GPT Search"}
          </button>
        <img className='hidden mb:5 md:block mt-2 w-11 h-11' alt='usericon' src={PROFILE_LOGO} />
         
        <button onClick={handleSignOut} className='font-bold text-white cursor-pointer' >
         (Sign Out)
         </button>
      </div>
     )}
   </div>

  );
};

export default Header;