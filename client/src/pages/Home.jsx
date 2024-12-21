import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Ensure correct import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListing, setOfferListings] = useState([]);
  const [saleListings, setSalesListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSalesListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Top Section */}
      <div className="flex flex-col max-w-6xl gap-6 px-3 mx-auto p-28">
        <h1 className="text-3xl font-bold text-slate-700 lg:text-6xl">
          This is the best place{" "}
          <span className="text-slate-500">For your Dream</span>
          <br />
          Explore Now!
        </h1>
        <div className="text-xs text-gray-400 sm:text-sm">
          Ravindu Estate is the perfect place to find your dream home.
        </div>
        <Link
          to="/search"
          className="text-xs font-bold text-blue-800 sm:text-sm hover:underline"
        >
          Let's Explore
        </Link>
      </div>

      <div className="flex flex-col max-w-6xl gap-8 p-3 mx-auto my- 2">
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div>
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Offer
              </h2>

              <Link
                to={`/search?offer=true`}
                className="text-sm text-purple-800 hover:underline"
              >
                Show more offers
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {offerListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div>
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>

              <Link
                to={`/search?type=rent`}
                className="text-sm text-purple-800 hover:underline"
              >
                Show more places for rent
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div>
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sales
              </h2>

              <Link
                to={`/search?type=sale`}
                className="text-sm text-purple-800 hover:underline"
              >
                Show more places for sales
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
