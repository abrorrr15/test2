import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Divider,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import MenuCard from "./MenuCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian only", value: "vegetarian" },
  { label: "Non-Vegetarian", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const fastFoodCategories = [
  { id: 1, name: "Burgers" },
  { id: 2, name: "Fries" },
  { id: 3, name: "Chicken" },
  { id: 4, name: "Salads" },
  { id: 5, name: "Desserts" },
  { id: 6, name: "Beverages" },
];

const RestaurantDetails = () => {
  const [selectedFoodType, setSelectedFoodType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { id } = useParams();

  const restaurant = useSelector((state) => state.restaurant.restaurant);
  console.log("Redux State Restaurant:", restaurant);

  const handleFilter = (event) => {
    const { name, value } = event.target;
    if (name === "food_type") {
      setSelectedFoodType(value);
    } else if (name === "food_category") {
      setSelectedCategory(value);
    }
  };

  useEffect(() => {
    if (jwt && id) {
      setIsLoading(true);
      dispatch(getRestaurantById({ jwt, restaurantId: id }))
        .then(() => {
          dispatch(getRestaurantsCategory({ jwt, restaurantId: id }));
          dispatch(
            getMenuItemsByRestaurantId({
              jwt,
              restaurantId: id,
              vegetarian: true,
              nonveg: true,
              seasonal: true, // seasonal qiymati noto'g'ri bo'lsa, uni to'g'rilang
            })
          );
          
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [jwt, id, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Restaurant details are unavailable.</div>;
  }

  const categories = restaurant?.categories || fastFoodCategories;
  const menuItems = restaurant?.menuItems || [];

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesFoodType =
      selectedFoodType === "all" || item.type === selectedFoodType;
    const matchesCategory =
      selectedCategory === "All Categories" || item.category === selectedCategory;
    return matchesFoodType && matchesCategory;
  });

  return (
    <div className="px-5 lg:px-20">
      <section>
        <h3 className="text-gray-500 py-2 mt-10">
          Home / {restaurant?.city} / {restaurant?.name}
        </h3>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                className="w-full h-[40vh] object-cover rounded-lg shadow-lg"
                src={restaurant?.images?.[0]}
                alt="Restaurant Banner"
              />
            </Grid>
            <Grid container spacing={2}>
              {restaurant?.images?.slice(1, 3).map((image, index) => (
                <Grid item xs={12} sm={6} lg={6} key={index}>
                  <img
                    className="w-full h-[40vh] object-cover rounded-lg shadow-lg"
                    src={image}
                    alt={`Restaurant ${index + 1}`}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </div>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">{restaurant?.name}</h1>
          <p>{restaurant?.description}</p>
        </div>
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter p-5 shadow-md">
          <div className="box space-y-5 lg:sticky top-28">
            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
              Food Type
            </Typography>
            <FormControl className="py-10 space-y-5" component={"fieldset"}>
              <RadioGroup
                name="food_type"
                value={selectedFoodType}
                onChange={handleFilter}
              >
                {foodTypes.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Divider />
            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
              Food Category
            </Typography>
            <FormControl className="py-10 space-y-5" component={"fieldset"}>
              <RadioGroup
                name="food_category"
                value={selectedCategory}
                onChange={handleFilter}
              >
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      value={category.name}
                      control={<Radio />}
                      label={category.name}
                    />
                  ))
                ) : (
                  <Typography>No categories available</Typography>
                )}
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
            Menu
          </Typography>
          <MenuCard items={filteredMenuItems} />
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
