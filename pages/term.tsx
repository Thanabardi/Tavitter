import Head from "next/head";

import Navbar from "@/components/Navbar";

const Term = () => {
  return (
    <>
      <Head>
        <title>Terms of Service</title>
      </Head>
      <Navbar />
      <div className="grid grid-cols-4 h-screen">
        <div className="pt-16" />
        <div className="pt-16 bg-white col-span-2 border border-light-gray">
          <p className="text-xl font-semibold border-b p-3">Terms of Service</p>
          <p className="p-3 indent-8">
            You may use the Services only if you agree to form a binding
            contract with us and are not a person barred from receiving services
            under the laws of the applicable jurisdiction. In any case, you must
            be at least 13 years old, or in the case of Periscope 16 years old,
            to use the Services. If you are accepting these Terms and using the
            Services on behalf of a company, organization, government, or other
            legal entity, you represent and warrant that you are authorized to
            do so and have the authority to bind such entity to these Terms, in
            which case the words “you” and “your” as used in these Terms shall
            refer to such entity.
          </p>
        </div>
        <div className="pt-16" />
      </div>
    </>
  );
};
export default Term;
