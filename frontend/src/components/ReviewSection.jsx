import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/landing.css";

const ReviewsSection = () => {
  const reviews = [
    {
      guest: "Edwin, Nairobi, Kenya",
      rating: 5,
      date: "January 2026",
      text: "Awesome awesome place! Nothing short of amazing. Anyone coming to Bungoma should experience this space. Beautifully decorated, super responsive host, house is well stocked. You'll definitely enjoy staying here.",
    },
    {
      guest: "Anne, Nairobi, Kenya",
      rating: 5,
      date: "June 2024",
      text: "Erick's place is just it! He is truly a super host. His house was so neat and clean. He was extremely responsive and took care of our needs. Erick is on my top five for best hosts. I recommend his place to anyone visiting Bungoma.",
    },
    {
      guest: "Daisy, Nairobi, Kenya",
      rating: 5,
      date: "September 2023",
      text: "Erick is a great host, welcoming, replies fast. His unit has reliable internet, easy to access. I’d recommend his place anytime, any day.",
    },
    {
      guest: "Brooke, Columbus, Ohio",
      rating: 5,
      date: "July 2023",
      text: "Very pleased with our stay! Clean spot, nice location, the hosts thought of everything & the view was definitely a plus!",
    },
    {
      guest: "Hillary, Houston, Texas",
      rating: 5,
      date: "April 2023",
      text: "Hands down one of the best Airbnb’s I have stayed in globally. Spotlessly clean, thoughtfully designed, and plenty of supplies. Highly recommend!",
    },
    {
      guest: "Volker, Germany",
      rating: 5,
      date: "May 2023",
      text: "The place was in immaculate condition, very clean and tidy. All daily necessities were available. I will definitely book again.",
    },
    {
      guest: "Elizabeth, Nairobi, Kenya",
      rating: 5,
      date: "February 2023",
      text: "Very conveniently located with a very responsive host! Great deal for money!",
    },
    {
      guest: "Sane, Nairobi, Kenya",
      rating: 4,
      date: "December 2022",
      text: "Erick was helpful and very responsive to my requests. The place is secure and easy to find.",
    },
    {
      guest: "Rozed, Kenya",
      rating: 5,
      date: "December 2022",
      text: "A beautiful place to stay in Bungoma. Private and peaceful. Highly recommended.",
    },
    {
      guest: "Faith, Nairobi, Kenya",
      rating: 5,
      date: "March 2023",
      text: "Lovely place, I enjoyed my stay. Brandon is a lovely host, great communication.",
    },
    {
      guest: "Violet, Nairobi, Kenya",
      rating: 5,
      date: "February 2023",
      text: "I will definitely be coming back.... Brandon was amazing and he was always so responsive.",
    },
    {
      guest: "Seth, Nairobi, Kenya",
      rating: 5,
      date: "September 2022",
      text: "Definitely a gem in Bungoma...clean and perfect amenities.",
    },
    {
      guest: "Edgar, Nairobi, Kenya",
      rating: 4,
      date: "November 2022",
      text: "Great place to stay within Bungoma town.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="reviews" id="reviews">
      <div className="section-header">
        <h2>Guest Reviews</h2>
        <p style={{ textAlign: "center" }}>What our guests are saying about the Bungoma apartment</p>
      </div>

      <Slider {...settings} className="reviews-slider">
        {reviews.map((rev, idx) => (
          <div className="review-card" key={idx}>
            <div className="review-quote">“</div>

            <p className="review-text">{rev.text}</p>

            <div className="review-footer">
              <div className="review-avatar">{rev.guest.charAt(0)}</div>

              <div className="review-meta">
                <strong>{rev.guest}</strong>
                <span>{rev.date}</span>

                <div className="rating">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ReviewsSection;
