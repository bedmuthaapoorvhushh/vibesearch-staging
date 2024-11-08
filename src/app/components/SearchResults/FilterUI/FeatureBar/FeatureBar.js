import utilities from "../../../utilities/utilities";
import FilterButton from "./FilterButton/FilterButton";
import styles from "./FeatureBar.module.css";
import { HStack } from "@chakra-ui/react";
export default function FeatureBar({
    onOpen, query
}) {
  return (
    <HStack
      my={{ md: "1.25rem", base: "0.65rem" }}
      mx={{ md: "4rem", base: "1rem" }}
      spacing={{ md: 4, base: 0 }}
      display="flex"
      flexDirection="row"
      justifyContent={{ base: "space-between", md: "flex-start" }}
    >
      <FilterButton onOpen={onOpen}></FilterButton>
      <div className={`${styles.FilterUI__Query} figtree`}>{query}</div>
      <utilities.FashionDiceRoll></utilities.FashionDiceRoll>
    </HStack>
  );
}
