import { useState, useEffect } from "react";
import { Box, Image, Center, Heading, HStack } from "@chakra-ui/react";
import { getDiscounts } from "../../../services/tickets";
import { useQuery } from "@tanstack/react-query";

const Promo = ({ tickets }) => {
  const [currentImage, setCurrentImage] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [uniqueImages, setUniqueImages] = useState([]);
  const [minDiscount, setMinDiscount] = useState(0);

  const [discounts, setDiscounts] = useState([]);
  // Use react query to fetch API
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["promo"],
    queryFn: () => getDiscounts(),
  });

  useEffect(() => {
    if (isSuccess) {
      setDiscounts(data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    // Extract unique images from tickets
    if (tickets) {
      const images = tickets.map((ticket) => ticket.arrival.city.image);
      const unique = [...new Set(images)];
      setUniqueImages(unique);
      setCurrentImage(unique[0]); // Initialize first image
    }

    // Find minimum discount percentage
    if (discounts) {
      const min = Math.min(...discounts.map((d) => d.percentage));
      setMinDiscount(min);
    }
  }, [tickets, discounts]);

  useEffect(() => {
    if (uniqueImages.length === 0) return;

    const interval = setInterval(() => {
      // Update prevImage before changing currentImage
      setPrevImage(currentImage);
      setImageIndex((prevIndex) => (prevIndex + 1) % uniqueImages.length);
      setCurrentImage(uniqueImages[(imageIndex + 1) % uniqueImages.length]);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentImage, uniqueImages, imageIndex]);

  return (
    <HStack justifyContent="center" alignItems="center" zIndex={-10}>
      <Box
        width="90vw"
        color="white"
        position="relative"
        overflow="hidden"
        borderRadius={10}
      >
        <Box
          bgColor="#ffec99"
          width={{ base: "43vw", sm: "42vw", md: "33vw" }}
          py="6vh"
          px="5vw"
        >
          <Heading
            size={{ base: "md", sm: "xl", md: "2xl", lg: "3xl" }}
            fontWeight="extrabold"
            fontStyle="italic"
            color="black"
          >
            Diskon dimulai dari
          </Heading>
          <Heading
            mt={1}
            size={{ base: "2xl", sm: "3xl", md: "4xl" }}
            fontWeight="extrabold"
            color="#2078b8"
          >
            {isPending ? "0" : minDiscount}%!
          </Heading>
        </Box>

        {/* New image */}
        <Image
          src={currentImage}
          alt="Current Promo"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          // transition="opacity 1s ease-in-out"
          opacity={1} // Fully visible
          zIndex={-1}
          loading="lazy"
        />

        {/* Previous image */}
        <Image
          src={prevImage}
          alt="Previous Promo"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          // transition="opacity 1s ease-in-out"
          opacity={0} // Fade out
          zIndex={-1}
          loading="lazy"
        />

        <Box
          position="absolute"
          top="0"
          left={{ base: "42vw", sm: "40vw", md: "33vw", lg: "32vw" }}
          width={{ base: "35vw", md: "40vw" }}
          height="full"
          bg="linear-gradient(to right, #ffec99, transparent)"
        />
      </Box>

      <Center
        bgGradient="to-r"
        gradientFrom="#44b3f8"
        gradientTo="#70caff"
        color="white"
        textAlign="center"
        width="100%"
        height={{ base: "12vh", sm: "14vh", lg: "16vh" }}
        py={10}
        zIndex={-10}
        position="absolute"
        overflow="hidden"
      ></Center>
    </HStack>
  );
};

export default Promo;
