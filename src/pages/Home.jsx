import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AOS from "aos";
import gsap from "gsap";

export default function Home() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [email, setEmail] = useState("");

  const toggleFAQ = (i) => setActiveFAQ(activeFAQ === i ? null : i);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out-cubic",
      once: true,
    });

    gsap.from(".hero-title", {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: "power3.out",
    });
    gsap.from(".hero-subtext", {
      opacity: 0,
      y: 30,
      delay: 0.5,
      duration: 1.2,
    });
    gsap.from(".hero-buttons", {
      opacity: 0,
      y: 20,
      delay: 0.8,
      stagger: 0.2,
    });
  }, []);

  return (
    <div className="w-full">
      {/* HERO - Enhanced Video Background */}
      <section className="relative h-screen min-h-[700px] overflow-hidden shadow-2xl mb-28 md:mb-32 lg:mb-36">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3183862/3183862-sd_640_360_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 flex flex-col justify-center items-center text-center px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="hero-title text-white font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 px-4">
              Unlock Your Future With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Top-Tier Courses
              </span>{" "}
              🚀
            </h1>
            <p className="hero-subtext text-gray-200 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8 md:mb-10 px-4">
              Learn in-demand skills that help you earn, grow & stand out in the
              competitive digital world.
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center px-4">
              <Link
                to="/courses"
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base md:text-lg font-bold rounded-xl md:rounded-2xl hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl text-center"
              >
                Explore All Courses
              </Link>
              <Link
                to="/signup"
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 border-2 border-white text-white text-base md:text-lg font-bold rounded-xl md:rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 text-center"
              >
                Start Learning Free
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* CATEGORIES - Enhanced */}
      <section data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 md:mb-32 lg:mb-36">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
            Choose Your Learning Path 🎯
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
            Discover courses across cutting-edge technologies and high-demand
            skills
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              name: "Web Development",
              icon: "🌐",
              color: "bg-gradient-to-r from-blue-500 to-cyan-500",
            },
            {
              name: "Mobile Development",
              icon: "📱",
              color: "bg-gradient-to-r from-green-500 to-emerald-500",
            },
            {
              name: "AI & Machine Learning",
              icon: "🤖",
              color: "bg-gradient-to-r from-purple-500 to-pink-500",
            },
            {
              name: "Data Science",
              icon: "📊",
              color: "bg-gradient-to-r from-orange-500 to-red-500",
            },
            {
              name: "UI/UX Design",
              icon: "🎨",
              color: "bg-gradient-to-r from-pink-500 to-rose-500",
            },
            {
              name: "Cybersecurity",
              icon: "🔒",
              color: "bg-gradient-to-r from-red-500 to-orange-500",
            },
            {
              name: "Blockchain",
              icon: "⛓️",
              color: "bg-gradient-to-r from-gray-700 to-gray-900",
            },
            {
              name: "Business & Marketing",
              icon: "💼",
              color: "bg-gradient-to-r from-yellow-500 to-amber-500",
            },
          ].map((cat, i) => (
            <div
              key={i}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-slate-700 cursor-pointer"
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-xl ${cat.color} flex items-center justify-center text-2xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {cat.icon}
              </div>
              <h3 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENT STATS - Enhanced */}
      <section
        data-aos="fade-up"
        className="relative py-20 md:py-24 text-white overflow-hidden mb-28 md:mb-32 lg:mb-36"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-8">
            We Don't Just Teach.
            <br />
            We Transform Careers.
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-12 md:mb-16">
            Join thousands of students who've transformed their careers with our
            industry-leading courses
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 font-bold">
            {[
              { number: "15,000+", label: "Active Students" },
              { number: "4.9⭐", label: "Average Rating" },
              { number: "120+", label: "Countries Worldwide" },
              { number: "98%", label: "Career Success Rate" },
            ].map((stat, i) => (
              <div key={i} data-aos="zoom-in" data-aos-delay={i * 200}>
                <div className="text-4xl md:text-5xl font-black mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTORS - Enhanced */}
      <section data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 md:mb-32 lg:mb-36">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white">
            Learn From Industry Experts 👨‍🏫
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto">
            Our instructors are seasoned professionals with real-world
            experience
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {[
            {
              name: "Sarah Johnson",
              role: "Senior Full-Stack Developer",
              exp: "12+ Years",
              students: "8,500+",
              company: "Ex-Google",
            },
            {
              name: "Mike Chen",
              role: "AI Research Scientist",
              exp: "10+ Years",
              students: "6,200+",
              company: "Ex-OpenAI",
            },
            {
              name: "Emily Rodriguez",
              role: "Lead UX Designer",
              exp: "8+ Years",
              students: "5,800+",
              company: "Ex-Meta",
            },
          ].map((instructor, i) => (
            <div
              key={i}
              className="group text-center p-6 md:p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 dark:border-slate-700"
              data-aos="zoom-in"
              data-aos-delay={i * 200}
            >
              <div className="relative inline-block">
                <img
                  src={`https://i.pravatar.cc/200?img=${i + 10}`}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto border-4 border-white dark:border-slate-800 shadow-lg group-hover:scale-110 transition-transform duration-300"
                  alt={instructor.name}
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center">
                  <span className="text-white font-bold text-sm md:text-base">✓</span>
                </div>
              </div>
              <h3 className="mt-6 font-black text-xl md:text-2xl text-gray-900 dark:text-white">
                {instructor.name}
              </h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold mt-2">
                {instructor.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base">
                {instructor.company} • {instructor.exp} Experience
              </p>
              <div className="mt-4 bg-gray-50 dark:bg-slate-700 rounded-xl p-3 md:p-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {instructor.students} Students Taught
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATE - Enhanced */}
      <section data-aos="fade-up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 md:mb-32 lg:mb-36">
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-gray-200 dark:border-slate-700">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 text-gray-900 dark:text-white">
            Earn Industry-Recognized Certificates 🎖️
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10">
            Showcase your achievements on LinkedIn, resumes, and portfolios with
            our verified digital certificates
          </p>
          <div className="relative max-w-4xl mx-auto">
            <img
              src="/fakecerti.png"
              alt="Professional Certificate"
              className="w-full rounded-xl md:rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 cursor-pointer border-4 md:border-8 border-white dark:border-slate-800"
            />
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-yellow-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg shadow-lg">
              Verified & Shareable
            </div>
          </div>
        </div>
      </section>

      {/* FAQs - Enhanced */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 md:mb-32 lg:mb-36" data-aos="fade-up">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-slate-700">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-8 md:mb-12 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              [
                "Is it lifetime access?",
                "Yes! Once you purchase a course, you get lifetime access to all current and future content updates. Learn at your own pace forever.",
              ],
              [
                "Do I get certificates for courses?",
                "Absolutely! Each completed course comes with a downloadable, verifiable certificate that you can share on LinkedIn and other professional platforms.",
              ],
              [
                "What's your refund policy?",
                "We offer a 100% no-questions-asked refund within 7 days of purchase if you're not completely satisfied with your learning experience.",
              ],
              [
                "Are there any prerequisites?",
                "Most beginner courses require no prior knowledge. Advanced courses will clearly list any prerequisites so you can choose appropriately.",
              ],
              [
                "Can I download course content?",
                "Yes, most course materials including videos, code files, and resources are available for download for offline learning.",
              ],
            ].map(([q, a], i) => (
              <div
                key={i}
                className="border border-gray-200 dark:border-slate-700 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-500 dark:hover:border-indigo-500"
              >
                <div
                  className="p-4 md:p-6 cursor-pointer flex justify-between items-center bg-gray-50 dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-300"
                  onClick={() => toggleFAQ(i)}
                >
                  <h3 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white pr-4">{q}</h3>
                  <span className="text-2xl font-light text-indigo-600 dark:text-indigo-400 min-w-8 text-center">
                    {activeFAQ === i ? "−" : "+"}
                  </span>
                </div>
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    activeFAQ === i
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-4 md:p-6 pt-2 text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
                    {a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER - Enhanced */}
      <section data-aos="fade-up" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4">
            Get Free Learning Resources & Updates 💌
          </h2>
          <p className="text-indigo-100 text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Join 10,000+ learners who receive exclusive tips, course updates,
            and free resources every week
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-0 text-gray-800 text-base md:text-lg focus:ring-4 ring-indigo-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="px-8 md:px-10 py-3 md:py-4 bg-white text-indigo-600 font-bold rounded-xl md:rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg text-base md:text-lg"
            >
              Subscribe Now
            </button>
          </form>
          <p className="text-indigo-200 text-sm mt-4">
            No spam ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

    </div>
  );
}
