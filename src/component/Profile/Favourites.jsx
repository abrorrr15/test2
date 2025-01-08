import React from 'react';
import RestaurantCard from '../Restaurant/RestaurantCart';
import { useSelector } from 'react-redux';

const Favourites = () => {
  const favourites = useSelector((state) => state.auth.favorites);
  console.log("Redux favorites:", favourites);

  return (
    <div>
      <h1 className="py-5 text-xl font-semibold text-center">My Favorites</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {favourites.length > 0 ? (
          favourites.map((item) => <RestaurantCard key={item.id} item={item} />)
        ) : (
          <p>No favorites found!</p>
        )}
      </div>
    </div>
  );
};


export default Favourites;
