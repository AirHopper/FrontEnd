import { useEffect, useState } from "react";
import {
  Text,
  Stack,
  HStack,
  Image,
  createListCollection,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TicketCard from "./TicketCard";
import TicketSkeletonCard from "./Skeleton/TicketSkeletonCard";
import { NoData } from "../../../assets/img";
import { useQuery } from "@tanstack/react-query";
import { getDiscounts, getTickets } from "../../../services/tickets";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

const TicketFav = ({ handleSelectCard }) => {
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(1);

  // Continent Filter State
  const [continentFilter, setContinentFilter] = useState("");

  // Continent Filter Handler for Responsive
  const continents = createListCollection({
    items: [
      { label: "Semua", value: "" },
      { label: "Asia", value: "Asia" },
      { label: "Amerika", value: "Amerika" },
      { label: "Australia", value: "Australia" },
      { label: "Eropa", value: "Eropa" },
    ],
  });

  const handleChange = (value) => {
    setContinentFilter(value);
  };

  // getData
  const [tickets, setTickets] = useState([]);
  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: ["flights", currentPage, pageLimit, continentFilter],
    queryFn: () => getTickets(currentPage, pageLimit, continentFilter),
    enabled: true,
    retry: 1,
  });

  useEffect(() => {
    if (isSuccess) {
      // Update state data
      setTickets(data?.data || []);

      // Update page, limit, and total items
      setCurrentPage(currentPage);
      setPageLimit(pageLimit);
      setTotalItems(data?.pagination?.totalItems);

      // Update filter state
      setContinentFilter(continentFilter);
    }
  }, [data, isSuccess]);

  return (
    <Stack
      px={{
        base: "1.5rem",
        sm: "2rem",
        md: "4rem",
        lg: "9.5rem",
        xl: "21rem",
      }}
    >
      <Stack direction="column">
        <Text fontWeight="bold">Destinasi Favorit</Text>

        {/* Continent Filters */}
        <HStack display={{ base: "none", md: "flex" }}>
          <Button
            size="md"
            borderRadius="xl"
            bgColor="#44b3f8"
            _hover={{ bgColor: "#2078b8" }}
            onClick={() => setContinentFilter("")}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Semua
          </Button>
          <Button
            size="md"
            borderRadius="xl"
            bgColor="#a5d8ff"
            _hover={{ bgColor: "#70caff" }}
            color="gray.700"
            onClick={() => setContinentFilter("Asia")}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Asia
          </Button>
          <Button
            size="md"
            borderRadius="xl"
            bgColor="#a5d8ff"
            _hover={{ bgColor: "#70caff" }}
            color="gray.700"
            onClick={() => setContinentFilter("Amerika")}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Amerika
          </Button>
          <Button
            size="md"
            borderRadius="xl"
            bgColor="#a5d8ff"
            _hover={{ bgColor: "#70caff" }}
            color="gray.700"
            onClick={() => setContinentFilter("Australia")}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Australia
          </Button>
          <Button
            size="md"
            borderRadius="xl"
            bgColor="#a5d8ff"
            _hover={{ bgColor: "#70caff" }}
            color="gray.700"
            onClick={() => setContinentFilter("Eropa")}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Eropa
          </Button>
        </HStack>

        {/* Continent Filter Select (Responsive) */}
        <SelectRoot
          collection={continents}
          size="md"
          width="full"
          display={{ base: "visible", md: "none" }}
        >
          <SelectLabel>Pilih Benua</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="Semua" />
          </SelectTrigger>
          <SelectContent>
            {continents.items.map((continent) => (
              <SelectItem
                item={continent}
                key={continent.value}
                onClick={() => handleChange(continent.value)}
              >
                {continent.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Stack>

      {/* Ticket Cards */}
      <HStack justifyContent="center" marginTop={5} flexWrap="wrap">
        {isError ? (
          <Stack alignItems="center" mt={2}>
            <Image
              src={NoData}
              alt="No data Image"
              width="25%"
              objectFit="cover"
            />
            <Text>Data tidak ditemukan</Text>
            <Text color="#44b3f8" mt={-2}>
              Coba lagi nanti
            </Text>
          </Stack>
        ) : isPending ? (
          Array.from({ length: 5 }).map((_, index) => (
            <TicketSkeletonCard key={index} />
          ))
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onSelectCard={handleSelectCard}
            />
          ))
        )}
      </HStack>

      {/* Pagination */}
      <HStack justifyContent="center" mt={6}>
        <PaginationRoot
          count={totalItems}
          pageSize={pageLimit}
          currentPage={currentPage}
          onPageChange={(event) => {
            setCurrentPage(event.page);
          }}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </HStack>
    </Stack>
  );
};

export default TicketFav;
