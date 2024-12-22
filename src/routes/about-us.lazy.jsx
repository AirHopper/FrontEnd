import { useEffect, React } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import {
  Box,
  Container,
  Text,
  Heading,
  Flex,
  Image,
  Button,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faGoogle,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { 
  Binar, 
  Kamdek, 
  Msib, 
  ridhwan,
  joe,
  juan,
  subhan,
  bima,
  ryan,
  kak_reza,
  royhan,
  zaky,
  kak_mughie
} from '../assets/img';
export const Route = createLazyFileRoute('/about-us')({
  component: AboutUsPage,
});

function AboutUsPage() {
  useEffect(()=> {
    window.scrollTo(0,0)
  })
  // Data fasilitator
  const FACILITATORS = [
    {
      name: 'Mughie Arief Mughoni',
      role: 'Fasilitator Back End',
      avatar: kak_mughie,
    },
    {
      name: 'Fahmi Alfareza',
      role: 'Fasilitator FSW',
      avatar: kak_reza,
    },
  ];

  // Daftar anggota tim dibuat sebagai konstanta terpisah
  const TEAM_MEMBERS = [
    {
      name: 'Muhamad Royhan Fadhli',
      role: 'Back End Developer',
      avatar: royhan,
      links: {
        github: 'https://github.com/MRoyhanF',
        linkedin: 'https://www.linkedin.com/in/muhamad-royhan-fadhli-7b2aa5167/',
        google: 'https://mail.google.com/mail/?view=cm&fs=1&to=froyhan.learning@gmail.com',
      },
    },
    {
      name: 'Juan Verrel Tanuwijaya',
      role: 'Back End Developer',
      avatar: juan,
      links: {
        github: 'https://github.com/juan-vrrl',
        linkedin: 'https://www.linkedin.com/in/juan-verrel-tanuwijaya-389293291/',
        google: 'https://mail.google.com/mail/?view=cm&fs=1&to=juan.121140072@student.itera.ac.id'
      },
    },
    {
      name: 'Bima Rizqy Ramadhan',
      role: 'Back End Developer',
      avatar: bima,
      links: {
        github: 'https://github.com/BIMASKUY',
        linkedin: 'https://www.linkedin.com/in/bima-rizqy-ramadhan/',
        google: 'https://mail.google.com/mail/?view=cm&fs=1&to=bimarizqyramadhan@gmail.com',
      },
    },
    {
      name: 'Ahmad Subhan Daryhadi',
      role: 'Back End Developer',
      avatar: subhan,
      links: {
        github: 'https://github.com/ahmadsubhand',
        linkedin: 'https://www.linkedin.com/in/ahmadsubhand/',
        google: 'https://mail.google.com/mail/?view=cm&fs=1&to=ahmadsubhan@apps.ipb.ac.id',
      },
    },
    {
      name: 'Ridhwan Tsalasah Putra',
      role: 'Front End Developer',
      avatar: ridhwan,
      links: {
        github: 'https://github.com/ridwantsalasah',
        linkedin: 'https://www.linkedin.com/in/ridhwantsalasah/',
        google: 'https://mail.google.com/mail/?view=cm&fs=1&to=ridwantsalasah@gmail.com',
      },
    },
    {
      name: 'Ryan Nicholas Purba',
      role: 'Front End Developer',
      avatar: ryan,
      links: {
        github: 'https://github.com/ryanlikestocode44',
        linkedin: 'https://www.linkedin.com/in/ryan-nicholas-purba-717036326',
        google: 'https://mail.google.com/mail/?view=cm&fs=1&to=ryannichpurba44@gmail.com',
      },
    },
    {
      name: 'M. Zaky Pria Maulana',
      role: 'Front End Developer',
      avatar: zaky,
      links: {
        github: 'https://github.com/zkyymaulana',
        linkedin: 'https://www.linkedin.com/in/m-zaky-pria-maulana/',
        google: 'https://mail.google.com/mail/?view=cm&fs=1&to=zakymaulana363@gmail.com',
      },
    },
    {
      name: 'Joe Ferdinan',
      role: 'Front End Developer',
      avatar: joe,
      links: {
        github: 'https://github.com/JoF24',
        linkedin: 'https://www.linkedin.com/in/joeferdinan/',
        google: 'https://mail.google.com/mail/?view=cm&fs=1&to=ferdi24joe@gmail.com',
      },
    },
  ];

  return (
    <Container maxW={{ base: "container.sm", md: "container.md", lg: "container.lg" }} py={8} minH="100vh">
      {/* Tentang Kami Section */}
      <Box textAlign="center" mb={8}>
        <Heading size="3xl" fontWeight="bold" mb={6} color="#2078b8">
          Tentang Kami
        </Heading>
        <Text textStyle="xl" fontWeight="semibold" mb={5}>
          AirHopper hadir sebagai solusi inovatif untuk mempermudah perjalanan 
          udara Anda. Kami memahami bahwa mencari, memilih, dan membeli tiket 
          pesawat sering kali menjadi proses yang membingungkan dan memakan waktu. 
          Oleh karena itu, AirHopper dirancang untuk memberikan pengalaman yang sederhana, 
          efisien, dan ramah pengguna. Proyek ini merupakan langkah besar dalam menghadirkan teknologi modern ke industri perjalanan udara. 
          Dengan AirHopper, kami tidak hanya memberikan kenyamanan, tetapi juga membantu Anda merencanakan perjalanan dengan lebih hemat dan efisien.
          Ini adalah sebuah Project yang dibuat sebagai syarat kelulusan di program Studi Independen Bersertifikat Batch 7 di Binar Academy.
        </Text>
      </Box>

      {/* Kolaborasi Section */}
      <Box textAlign="center" mb={8}>
        <Heading size="3xl" fontWeight="bold" mb={7} color="#2078b8">
          Kolaborasi
        </Heading>
        <Flex justify="center" wrap="wrap" gap={6}>
          {[
            { name: "Binar", logo: Binar },
            { name: "MSIB", logo: Msib },
            { name: "Kampus Merdeka", logo: Kamdek },
          ].map((partner) => (
            <Box
              key={partner.name}
              p={6}
              borderWidth="2px"
              borderRadius="lg"
              shadow="2xl"
              textAlign="center"
              bg="white"
              width={["90%", "45%", "30%"]} // Responsif untuk ukuran layar kecil, sedang, besar
              h="auto"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              _hover={{ shadow: "md", transform: "translateY(-10px)" }}
              transition="all 0.3s"
            >
              <Image src={partner.logo} alt={partner.name} mb={4} maxW="150px" />
              <Text fontWeight="bold" fontSize="lg">
                {partner.name}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>

      <Box textAlign="center" mb={8}>
        <Heading size="3xl" fontWeight="bold" mb={4} color="#2078b8">
          Fasilitator
        </Heading>
        <Text textStyle="lg" fontWeight="semibold" mb={7}>
          Dibantu oleh fasilitator yang telah membimbing selama pengerjaan project berlangsung
        </Text>
        <Flex wrap="wrap" justify="center" gap={8}>
          {FACILITATORS.map((facilitator) => (
            <Box
              key={facilitator.name}
              p={6}
              borderWidth="2px"
              borderRadius="lg"
              shadow="2xl"
              textAlign="center"
              bg="white"
              width={["90%", "45%", "30%"]} // Responsif untuk ukuran layar kecil, sedang, besar
              h="auto"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              _hover={{ shadow: "md", transform: "translateY(-3px)" }}
              transition="all 0.3s"
            >
              <Image src={facilitator.avatar} alt={facilitator.name} boxSize="100px" borderRadius="full" border="1px solid" mb={4} />
              <Text mt={5} fontWeight="bold" fontSize="lg">{facilitator.name}</Text>
              <Text>{facilitator.role}</Text>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Team Project Section */}
      <Box textAlign="center" mb={8} mt={10}>
        <Heading size="3xl" fontWeight="bold" mb={4} color="#2078b8">
          Team Project
        </Heading>
        <Text textStyle="lg" fontWeight="semibold" mb={5}>
          Tim ini terdiri dari individu yang berbakat dan berkomitmen tinggi
          untuk menyelesaikan program.
        </Text>
        <Flex wrap="wrap" justify="center" gap={8}>
          {TEAM_MEMBERS.map((member) => (
            <Box
              key={member.name}
              p={6}
              borderWidth="2px"
              borderRadius="lg"
              shadow="2xl"
              textAlign="center"
              bg="white"
              width={["90%", "45%", "30%","22%"]}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              _hover={{ shadow: "md", transform: "translateY(-3px)" }}
              transition="all 0.3s"
            >
              <Image src={member.avatar} alt={member.name} boxSize="100px" borderRadius="full" mb={4} />
              <Text fontWeight="bold" fontSize="lg">{member.name}</Text>
              <Text>{member.role}</Text>
              <Flex gap={5} mt={6}>
                <Button
                  bg="white"
                  onClick={() => window.open(member.links.github, '_blank')}
                  _hover={{ shadow: "md", transform: "translateY(-5px)", bg: "yellow.300" }}
                >
                  <FontAwesomeIcon icon={faGithub} size="2xl" style={{ color: "#000000" }} />
                </Button>
                <Button
                  bg="white"
                  onClick={() => window.open(member.links.linkedin, '_blank')}
                  _hover={{ shadow: "md", transform: "translateY(-5px)", bg: "yellow.300" }}
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2xl" style={{ color: "#000000" }} />
                </Button>
                <Button
                  bg="white"
                  onClick={() => window.open(member.links.google, '_blank')}
                  _hover={{ shadow: "md", transform: "translateY(-5px)", bg: "yellow.300" }}
                >
                  <FontAwesomeIcon icon={faGoogle} size="2xl" style={{ color: "#000000" }} />
                </Button>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
    </Container>
  );
}
