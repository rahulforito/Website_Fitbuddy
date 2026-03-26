import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Send, User, MessageSquare, LogIn, LogOut } from 'lucide-react';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db, auth, signInWithGoogle, logout, handleFirestoreError, OperationType } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  uid: string;
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
      if (currentUser) {
        setName(currentUser.displayName || '');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    const path = 'reviews';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'), limit(20));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(fetchedReviews);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, [isAuthReady]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to show an error
        console.log('Sign-in popup closed by user');
      } else {
        console.error('Login failed:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      await handleSignIn();
      return;
    }

    if (!name || !comment || isSubmitting) return;
    
    setIsSubmitting(true);
    const path = 'reviews';
    
    try {
      const newReview = {
        name,
        rating,
        comment,
        createdAt: new Date().toISOString(),
        uid: user.uid,
      };
      
      await addDoc(collection(db, path), newReview);
      
      setComment('');
      setRating(5);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="bg-white rounded-[3rem] p-10 md:p-16 border-4 border-[#1A1A1A] shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-bl-full -mr-10 -mt-10" />
        
        <div className="flex items-center justify-between mb-12 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-4xl font-black tracking-tighter uppercase">DROP A REVIEW</h3>
          </div>
          {user && (
            <button 
              onClick={logout}
              className="flex items-center gap-2 text-sm font-black text-[#1A1A1A]/40 hover:text-red-600 transition-colors uppercase tracking-widest"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
        
        {!user ? (
          <div className="text-center py-16 space-y-8 relative z-10">
            <div className="w-24 h-24 bg-red-600/10 rounded-3xl flex items-center justify-center mx-auto text-red-600 border-2 border-red-600/20">
              <User size={48} />
            </div>
            <div className="space-y-3">
              <h4 className="text-3xl font-black uppercase tracking-tight">SIGN IN TO REVIEW</h4>
              <p className="text-xl text-[#4A4A4A] font-medium">Share your experience with the Fit Buddies community.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignIn}
              className="bg-[#1A1A1A] text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center gap-4 mx-auto shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] transition-all uppercase tracking-tight"
            >
              <LogIn size={24} />
              CONTINUE WITH GOOGLE
            </motion.button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-sm font-black text-[#1A1A1A]/40 uppercase tracking-widest ml-2">Your Name</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1A1A1A]/20" size={24} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Singh"
                    className="w-full bg-[#FDFCF8] border-2 border-[#1A1A1A] rounded-2xl py-5 pl-16 pr-8 text-[#1A1A1A] font-bold text-lg focus:outline-none focus:border-red-600 transition-all placeholder:text-[#1A1A1A]/20 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-black text-[#1A1A1A]/40 uppercase tracking-widest ml-2">Rating</label>
                <div className="flex items-center gap-3 h-[72px] px-8 bg-[#FDFCF8] border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star 
                        size={32} 
                        className={`${
                          (hoverRating || rating) >= star 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-[#1A1A1A]/10'
                        } transition-colors duration-200`} 
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-[#1A1A1A]/40 uppercase tracking-widest ml-2">Your Comment</label>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was the taste? Let us know!"
                className="w-full bg-[#FDFCF8] border-2 border-[#1A1A1A] rounded-2xl p-8 text-[#1A1A1A] font-bold text-lg focus:outline-none focus:border-red-600 transition-all h-48 placeholder:text-[#1A1A1A]/20 resize-none shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
                required
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-2xl font-black text-2xl transition-all shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center gap-4 uppercase tracking-tight ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={24} />
                  <span>SUBMIT REVIEW</span>
                </>
              )}
            </motion.button>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <AnimatePresence mode="popLayout">
          {reviews.map((review) => (
            <motion.div 
              key={review.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="bg-white p-10 rounded-[3rem] border-4 border-[#1A1A1A] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:shadow-[12px_12px_0px_0px_rgba(239,68,68,1)] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-bl-full -mr-8 -mt-8" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={`${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-[#1A1A1A]/10'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-black text-[#1A1A1A]/20 uppercase tracking-widest">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-2xl font-bold text-[#1A1A1A] mb-10 leading-tight relative z-10">
                "{review.comment}"
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-600 font-black text-xl border border-red-600/20">
                  {review.name.charAt(0)}
                </div>
                <p className="font-black text-red-600 uppercase tracking-tighter text-xl">{review.name}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {reviews.length === 0 && !isSubmitting && (
          <div className="col-span-full text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-[#1A1A1A]/20">
            <p className="text-[#1A1A1A]/40 font-black uppercase tracking-widest text-xl">No reviews yet. Be the first to drop one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
