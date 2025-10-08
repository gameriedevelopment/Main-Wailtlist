"use client";

import { useState } from "react";
import Script from "next/script";

export default function BrevoForm() {
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Brevo global config */}
      <Script id="brevo-config">{`
        window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
        window.LOCALE = 'en';
        window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
          "The information provided is invalid. Please review the field format and try again.";
        window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank.";
        window.GENERIC_INVALID_MESSAGE =
          "The information provided is invalid. Please review the field format and try again.";
        var AUTOHIDE = Boolean(0);
      `}</Script>

      <Script
        src="https://www.google.com/recaptcha/api.js?hl=en"
        strategy="afterInteractive"
      />
      <Script
        src="https://sibforms.com/forms/end-form/build/main.js"
        strategy="afterInteractive"
      />

      <form
        id="sib-form"
        method="POST"
        action="https://5cd24ac0.sibforms.com/serve/MUIFAB3PJLXsghQ5HyrcOJKr2ekpw4T8QzbpIdKqaI0CM3FfY-1TyHYYYXY1A8FPMdUqvByvcDbBJfbQZr46zrb-5znKD-CUCnjAtA44beulWdLIFXOaTigzQtFa_1wL6HRhIaoFiu6qgMHW4ybGn5ba_45FsGHDU_vMF5ahSMdu54sG-7t-JMZsHn7rV6D0cUf-wVcZyJoyUECr"
        data-type="subscription"
        // className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3 text-center"
        className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto mb-4"
      >
        {/* Email Input */}
        <input
          type="email"
          id="EMAIL"
          name="EMAIL"
          required
          placeholder="Enter your email to claim your stake"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 w-full sm:flex-1 bg-white/5 border border-white/10 text-base text-white rounded-lg px-4 
                     placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-[color:var(--neo)] 
                     focus-visible:border-[color:var(--neo)] transition-all duration-200"
        />

        {/* Submit Button */}
        <button
          type="submit"
          // className="h-12 px-6 bg-[color:var(--neo)] text-black font-medium rounded-lg
          //            hover:opacity-90 active:scale-95 transition-all duration-150"
          className="h-12 px-8 bg-[color:var(--neo)] hover:bg-[color:var(--acc)] text-black font-medium rounded-lg transition-all"
        >
          Claim Stake
        </button>
      </form>
    </>
  );
}
