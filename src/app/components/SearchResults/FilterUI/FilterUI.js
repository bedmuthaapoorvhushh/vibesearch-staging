"use client";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FeatureBar from "./FeatureBar/FeatureBar";
import Categories from "./Categories/Categories";
import LeftDrawer from "./LeftDrawer/LeftDrawer";
import { Divider } from "@chakra-ui/react";
import utilities from "../../utilities/utilities";
import styles from "./FilterUI.module.scss";
import services from "../../../services/services";
import Resources from "../../../resources/resources";
const FilterUI = ({
  setSelectedBrands,
  selectedBrands,
  applyFilter,
  query,
  setSelectedGenders,
  selectedGenders,
  applyGenderFilter,
  onCloseGenders,
  priceRange,
  setPriceRange,
  brands,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]); // Clear the selected brands
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  const handleClearFilters = () => {
    setSelectedBrands([]); // Clear selected brands
    window.location.reload(); // Reload the page
  };
  let [isImageSearch, setIsImageSearch] = useState(false);
  useEffect(() => {
    (async () => {
      setIsImageSearch(await services.vibesearch.isImageSearch(null));
    })();
  }, []);
  let [queryImage, setQueryImage] = useState("");
  useEffect(() => {
    (async () => {
      console.log(isImageSearch);
      isImageSearch
        ? setQueryImage(await services.vibesearch.getQueryImage())
        : "";
    })();
  }, [isImageSearch]);

  return (
    <>
      <div className={styles.FilterUI__SearchBoxAndDiceRollWrapper}>
        <div className={styles.FilterUI__SearchBoxAndDiceRoll}>
          <div className={styles.FilterUI__SearchBoxWrapper}>
            <utilities.AnimatedSearchBox
              boxWidth={64}
              inputWidth={40}
            ></utilities.AnimatedSearchBox>
          </div>
          <utilities.FashionDiceRoll
            buttonWidth={"20vw"}
          ></utilities.FashionDiceRoll>
        </div>
      </div>
      <div className={styles.FilterUI__ImageSearchButtonWrapper}>
        {!isImageSearch ? (
          <utilities.ImageSearchButton width={93}></utilities.ImageSearchButton>
        ) : (
          <div className={styles.FilterUI__PostImageSearch}>
            <div className={styles.FilterUI__QueryImageWrapper}>
              <div className={styles.FilterUI__QueryImage}>
                <img
                  className={styles.FilterUI__ClearImage}
                  onClick={() => {
                    setIsImageSearch(false);
                    localStorage.clear("image-file");
                  }}
                  src={Resources.images.CrossIcon.src}
                ></img>
                <img
                  className={styles.FilterUI__QueryImage}
                  src={queryImage}
                ></img>
              </div>
            </div>
            <utilities.ImageSearchButton
              width={74}
            ></utilities.ImageSearchButton>
          </div>
        )}
      </div>
      <FeatureBar onOpen={onOpen} query={query}></FeatureBar>
      <Divider
        mx={{ md: "4rem", base: "1rem" }}
        mt={{ md: "1rem", base: "0.5rem" }}
        w={"90%"}
        stroke={"#E6E6E6"}
      />

      <Categories
        clearAll={clearAll}
        selectedItems={selectedItems}
        toggleItem={toggleItem}
      ></Categories>

      <LeftDrawer
        applyFilter={applyFilter}
        applyGenderFilter={applyGenderFilter}
        brands={brands}
        isOpen={isOpen}
        onClose={onClose}
        priceRange={priceRange}
        selectedBrands={selectedBrands}
        setPriceRange={setPriceRange}
        setSelectedBrands={setSelectedBrands}
        setSelectedGenders={setSelectedGenders}
      ></LeftDrawer>
    </>
  );
};

export default FilterUI;
