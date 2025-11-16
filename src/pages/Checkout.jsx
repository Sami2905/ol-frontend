import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Check, Lock, CreditCard, ArrowLeft, Sparkles } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get("https://ncp-backend-atpa.onrender.com/api/courses");
        const selected = res.data.find((c) => c._id === id);
        setCourse(selected);
      } catch (err) {
        toast.error("Failed to load course");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handlePayment = async () => {
    if (!course) return;

    setPaying(true);

    try {
      const orderRes = await axios.post(
        "https://ncp-backend-atpa.onrender.com/api/payment/createOrder",
        { amount: course.price }
      );

      const order = orderRes.data;

      const options = {
        key: "rzp_test_RgJnkNPbcthhKd",
        amount: order.amount,
        currency: "INR",
        name: "CourseStore",
        description: course.title,
        order_id: order.id,
        handler: function (response) {
          toast.success("Payment Successful! 🎉");
          setTimeout(() => {
            navigate("/courses");
          }, 1200);
        },
        theme: { color: "#6366f1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Payment failed");
    }

    setPaying(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <Skeleton className="h-12 w-48 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Course not found
          </h2>
          <Button onClick={() => navigate("/courses")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </Card>
      </div>
    );
  }

  const features = [
    "Lifetime access to course content",
    "Certificate of completion",
    "24/7 support from instructors",
    "30-day money-back guarantee",
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Courses
        </motion.button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Course Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={course.img || "https://via.placeholder.com/600x400"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                  {course.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    What you'll get:
                  </h3>
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Payment Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                      Secure Checkout
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Your payment is encrypted and secure
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-400">Course Price</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white">
                      ₹{course.price}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-gray-600 dark:text-gray-400">Discount</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      -₹{Math.round(course.price * 0.33)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{course.price}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={paying}
                  loading={paying}
                  className="w-full mb-4"
                  size="lg"
                >
                  <CreditCard className="w-5 h-5" />
                  {paying ? "Processing..." : "Proceed to Payment"}
                </Button>

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  <p className="mb-2">
                    🔒 Secure payment powered by Razorpay
                  </p>
                  <p>
                    By completing your purchase, you agree to our{" "}
                    <a href="/terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      Terms of Service
                    </a>
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
