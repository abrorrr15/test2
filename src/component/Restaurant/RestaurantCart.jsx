import React, { useState, useEffect } from 'react';
import { Card, IconButton, Chip, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../State/Authentication/Action';

// Redux selector for getting favorites
const selectFavorites = state => state.auth.favorites || [];

const RestaurantCart = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  // Use selector to get favorites from the store
  const favorites = useSelector(selectFavorites);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Effect to check if the item is in favorites
  useEffect(() => {
    setIsFavorite(favorites.some(fav => fav.id === item?.id));
  }, [favorites, item?.id]);

  const handleAddToFavorite = () => {
    if (!item?.id || isLoading) return;

    setIsLoading(true);
    setIsFavorite(prev => !prev);

    dispatch(addToFavorite({ restaurantId: item.id, jwt }))
      .catch(() => {
        setIsFavorite(prev => !prev); // Revert to previous state on failure
        // Optionally show error message here
      })
      .finally(() => {
        setIsLoading(false); // Stop loading when done
      });
  };

  if (!item) {
    console.warn("Item data is missing");
    return <div>Loading...</div>; // More informative loading state
  }

  const isOpen = item.open;

  const handleNavigateToRestaurant = () => {
    if (item.open) {
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '26rem',
        borderRadius: '14px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
      className="restaurant-card"
    >
      <div className={`${isOpen ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
        <img
          className="w-full h-[12rem] sm:h-[14rem] md:h-[16rem] lg:h-[18rem] object-cover"
          src={(item.images && item.images[1]) || item.image || 'default-image-url.jpg'}
          alt={item.name || 'Restaurant'}
        />
        <Chip
          size="small"
          sx={{ position: 'absolute', top: '8px', left: '8px' }}
          color={isOpen ? 'success' : 'error'}
          label={isOpen ? 'Open' : 'Closed'}
        />
      </div>
      <div className="p-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="space-y-2 sm:space-y-1 sm:text-left text-center">
          <p
            onClick={handleNavigateToRestaurant}
            className="font-semibold text-lg text-gray-300 cursor-pointer"
          >
            {item.name}
          </p>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>
        <div>
          <IconButton color="error" onClick={handleAddToFavorite}>
            {isLoading ? (
              <CircularProgress size={24} color="error" />
            ) : isFavorite ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCart;
