import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const demo = [
  {
    category: "Nuts & seeds",
    ingredients: ["Cashews"],
  },
  {
    category: "Protein",
    ingredients: ["Ground beef", "Bacon strips"],
  },
];

const MenuCard = () => {
  const handleCheckBoxChange=(value)=>{
      console.log("value");
  }
  return (
    <div className="p-5">
      {demo.map((item, index) => (
        <Accordion key={index} className="mb-5 border rounded shadow-md">
          {/* Accordion header */}
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <div className="lg:flex items-center justify-between w-full">
              {/* Left Section */}
              <div className="lg:flex items-center lg:gap-5">
                <img
                  className="w-[7rem] h-[7rem] object-cover rounded"
                  src="http://res.cloudinary.com/dcpesbd8q/image/upload/v1708317657/no8xfzdhsrdy4ezmcczr.jpg"
                  alt={item.category}
                />
                <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                  <p className="font-semibold text-xl">{item.category}</p>
                  <p className="text-gray-400">Delicious and healthy food</p>
                </div>
              </div>
              {/* Price Section */}
              <p className="font-bold text-lg text-green-600">₹499</p>
            </div>
          </AccordionSummary>

          <AccordionDetails>
          <form>
            <div className="flex gap-5 flex-wrap">
              {demo.map((item, index) => (
                <div key={index}>
                  {/* Kategoriya nomi */}
                  <p>{item.category}</p>
                  {/* Ingredientlar checkboxlari */}
                  <FormGroup>
                    {item.ingredients.map((ingredient, i) => (
                      <FormControlLabel
                        key={i}
                        control={<Checkbox onChange={()=>handleCheckBoxChange()} />}
                        label={ingredient}
                      />
                    ))}
                  </FormGroup>
                </div>
              ))}
            </div>
            <div className="pt-5">
              <Button variant="contained" disabled={false} type="submit">{true?"Add to Card":"Out Of Stock"}</Button>
            </div>
          </form>
        </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default MenuCard;
