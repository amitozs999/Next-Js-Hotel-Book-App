"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

import { setIsAuthenticated, setUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";



const Header = () => {

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);


  const { data } = useSession();     //gives current logged in (/) in user details

  // console.log(data+'here1');
  // console.log(data?.user+'here1');
  // console.log(data?.user?.email+'here1');
  // console.log(data?.user?.name+'here1');

  useEffect(() => {
    if (data) {
      dispatch(setUser(data?.user));
      dispatch(setIsAuthenticated(true));
    }
  }, [data]);

  
  const logoutHandler = () => {
    signOut();
  };

  return (
    <nav className="navbar sticky-top py-2">

    {/* //logo */}
      <div className="container">
        <div className="col-6 col-lg-3 p-0">

          <div className="navbar-brand">
            
            <a href="/"   style={{color:"red",fontStyle:"normal"}}>
              {/* <img
                style={{ cursor: "pointer" }}
                src="/images/"
                alt="Hotel App"
              /> */}
              {/* //Hotel Booking App */}

<i className=" ml-10 	fas fa-hotel"  style={{color:"red",fontSize:"30px"}}> 

  
</i>  Hotels
            </a>
            
          </div>
        </div>


      {/* //show based on if user is logged in or not */}
        <div className="col-6 col-lg-3 mt-3 mt-md-0 text-end">

        {user ? (
            <div className="ml-4 dropdown d-line">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={
                      user?.avatar
                        ? user?.avatar?.url
                        : "/images/default_avatar.jpg"
                    }
                    alt="Ekas Singh"
                    className="rounded-circle placeholder-glow mt-2"
                    height="45"
                    width="45"
                  />
                </figure>
                <span  className="placeholder-glow ps-1 ml-2 " style={{marginBottom:"10px",display:"inline-block"}}> {user?.name}</span>
              </button>

              <div
                className="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton1"
              >

{user?.role === "admin" && (
                  <Link href="/admin/dashboard" className="dropdown-item">
                    Dashboard
                  </Link>
                )}
             
                <Link href="/bookings/me" className="dropdown-item">
                  My Bookings
                </Link>
                <Link href="/me/update" className="dropdown-item">
                  Profile
                </Link>
                <Link
                  href="/"
                  className="dropdown-item text-danger"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          )  : (
            <>
              {data === undefined && (
                <div className="placeholder-glow">
                  <figure className="avatar avatar-nv placeholder bg-secondary"></figure>
                  <span className="placeholder w-25 bg-secondary ms-2"></span>
                </div>
              )}
              {data === null && (
                <Link
                  href="/login"
                  className="btn btn-danger px-4 text-white login-header-btn float-right"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
