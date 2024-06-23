import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighLightText from '../components/core/HomePage/HighLightText';
import CTAButtom from "../components/core/HomePage/Buttom"
import Banner from "../assets/Images/banner.mp4"
import CodeBlock from '../components/core/HomePage/CodeBlock';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LanguageLearingSection from '../components/core/HomePage/LanguageLearingSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
const Home = () => {
    return (
        <div >
            {/* Section 1 */}
            <div className="flex justify-center text-white">
                <div className="relative flex flex-col w-11/12 max-w-maxContent  items-center">
                    <Link to={"/signup"}>
                        <div className=' mt-16 group mx-auto rounded-full bg-richblack-800 hover:scale-95 w-fit font-bold  transition-all  duration-200 text-richblack-200'>
                            <div className=" flex gap-4 justify-center  group-hover:bg-richblack-900  px-6 py-[14px] ">
                                <p className="">Become an Instructor</p>
                                <FaArrowRight />
                            </div>
                        </div>
                    </Link>
                    <div className="flex text-center font-semibold text-4xl gap-2 mt-7 text-white">
                        Empower Your Future with
                        <HighLightText text={"Coding Skills"} />
                    </div>
                    <div className='text-center mt-5 text-richblack-300 text-lg w-[90%] font-bold'>
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                    </div>
                    <div className="flex gap-6 mt-12">
                        <CTAButtom active={true} linkTo={"/signup"}>
                            Learn more
                        </CTAButtom>
                        <CTAButtom active={false} linkTo={"/login"}>
                            Book a Demo
                        </CTAButtom>
                    </div>
                    <div className='mt-12   shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                        <video muted loop autoPlay>
                            <source src={Banner} type='video/mp4' />
                        </video>
                    </div>
                    {/* Code section 1 */}
                    <div className='w-[100%] '>
                        <CodeBlock
                            position={"lg:flex-row"}
                            heading={
                                <div className="text-4xl flex flex-wrap gap-3 font-semibold">
                                    Unlock your <HighLightText text={"coding potential"} /> with our online
                                    courses.
                                </div>
                            }
                            subheading={
                                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                            }
                            ctabtn1={{
                                btnText: "Try it Yourself",
                                link: "/signup",
                                active: true,
                            }}
                            ctabtn2={{
                                btnText: "Learn More",
                                link: "/signup",
                                active: false,
                            }}
                            codeColor={"text-yellow-25"}
                            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                            backgroundgradient={<div className="codeblock1 absolute"></div>}
                        />
                    </div>
                    {/* Code section 2 */}
                    <div className='w-[100%] '>
                        <CodeBlock
                            position={" lg:flex-row-reverse"}
                            heading={
                                <div className="text-4xl flex flex-wrap gap-3 font-semibold">
                                    Start <HighLightText text={"coding in seconds"} />
                                </div>
                            }
                            subheading={
                                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                            }
                            ctabtn1={{
                                btnText: "Continue Lesson",
                                link: "/signup",
                                active: true,
                            }}
                            ctabtn2={{
                                btnText: "Learn More",
                                link: "/signup",
                                active: false,
                            }}
                            codeColor={"text-blue-25"}
                            codeblock={`import React from 'react'\nimport { Link } from 'react-router-dom'\nimport { FaArrowRight } from "react-icons/fa6";\nimport HLText from '../components/HLText';\nimport CTAButtom from "../components/Buttom"\nconst Home = () => {\nreturn (  \nHere your code\n)\n}\nexport default Home`}
                            backgroundgradient={<div className="codeblock2  absolute"></div>}
                        />
                    </div>

                </div>
            </div>

            {/* Section 2 */}
            <div className=' bg-pure-greys-5 text-richblack-700'>
                <div className="h-[333px] homepage_bg">
                    <div className="w-full h-[150px]"></div>
                    <div className="w-11/12   mx-auto max-w-maxContent flex items-center justify-center gap-5">
                        <div className="flex text-white gap-7">
                            <CTAButtom active={true} linkTo={"/signup"}>
                                Explore Full Catalog
                                <FaArrowRight />
                            </CTAButtom>
                            <CTAButtom active={false} linkTo={"/signup"}>
                                Learn more
                            </CTAButtom>
                        </div>
                    </div>
                </div>
                <div className='w-11/12 mt-[90px] flex flex-col item-center justify-center max-w-maxContent mx-auto '>
                    <div className="flex  flex-col lg:flex-row gap-5 mb-12">
                        <div className=" text-4xl  lg:w-[45%] ">Get the skills you need for a
                            <HighLightText text={"job that is in demand."} />
                        </div>
                        <div className="flex flex-col lg:w-[40%] items-start gap-10 ">
                            <div className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                         
                           <CTAButtom active={true} linkTo={"/signup"}>
                                Learn more
                            </CTAButtom>
                          
                        </div>
                    </div>
                </div>
                <TimeLineSection/>
                <LanguageLearingSection/>
            </div>
            {/* Section 3 */}
            <div className=" w-11/12 flex flex-col mx-auto mt-[80px] bg-richblack-900 gap-8 text-white">
            <InstructorSection/>
            <h2 className=' mt-40 text-4xl font-semibold text-center'>Reviews from other learners</h2>
            </div>
            {/* Footer */}
            <Footer/>
        </div>
    )
}

export default Home
