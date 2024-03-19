"use client";
import Image from "next/image";
import "./root.css";
import { useSession } from "next-auth/react";
import AccessDenied from "../Access/AcessDenied";

export default function Home() {
  //const { data: session, status } = useSession();

  // if (status !== "authenticated") {
  //   return <AccessDenied />;
  // }

  return (
    <div className="main-div">
      {/* <h1 className="title-text">Emergency Official/Volunteer Login</h1>
      <Login /> */}
      <Image
        src={"./Report_Button.svg"}
        alt="Report Button"
        height={140}
        width={140}
        className="mb-12"
      />

      <div className="action-item-container">
        <p className="mb-8">Submit Accessibility Form</p>
        <div className="access-form-buttons">
          <button className="reject-button">No Thanks</button>
          <button className="accept-button">Start</button>
        </div>
      </div>

      <div className="action-item-container">
        <p>Hazards Within 10 Miles</p>
      </div>
    </div>
  );
}
