import * as React from 'react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Stack,
  Text,
  Image,
  Button,
} from '@chakra-ui/react'
import '../../components/Buyer/Calendar/Calendarcss.css'
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb'
import imageSuccess from "../../assets/img/payment_success.png"

export const Route = createLazyFileRoute('/payment/success')({
  component: PaymentSuccess,
})

function PaymentSuccess() {
    
    return (
        <>
            <Box bg="white" px={4}>
                <Flex
                w="100%"
                alignItems="center"
                justifyContent="center"
                direction="column"
                borderBottom="2px solid"
                borderColor="gray.100"
                >
                <Flex w="75%" direction="column" marginBottom={5}>
                    <Stack color="black" marginTop={10} marginLeft={30} marginBottom={5}>
                    <BreadcrumbRoot size="lg">
                        <BreadcrumbLink
                        href="/checkout"
                        color="black"
                        fontWeight="bold"
                        >
                        Isi Data Diri
                        </BreadcrumbLink>
                        <BreadcrumbLink 
                        href="/payment"
                        color="black" 
                        fontWeight="bold">
                        Bayar
                        </BreadcrumbLink>
                        <BreadcrumbCurrentLink color="black" fontWeight="bold">
                        Selesai
                        </BreadcrumbCurrentLink>
                    </BreadcrumbRoot>
                    </Stack>
                    <Flex
                    justifyContent="center"
                    bg="#73CA5C"
                    color="white"
                    p={3}
                    borderRadius="lg"
                    w="92%"
                    marginLeft={10}
                    >
                    <Text fontFamily="Inter, sans-serif">
                        Terimakasih atas pembayaran transaksi
                    </Text>
                    </Flex>
                </Flex>
                </Flex>
                <Flex 
                w="100%" 
                alignItems="center" 
                justifyContent="center"
                marginBottom={20}
                >
                    <Flex w="70%" alignItems="center" direction="column">
                        <Image src={imageSuccess} width="17vw" marginTop={20}/>
                        <Text color="#7126B5" fontWeight="bold" marginTop={5}>Selamat!</Text>
                        <Text color="black" fontWeight="bold">Transaksi Pembayaran Tiket Sukses!</Text>
                        <Button
                        colorPalette="purple"
                        width="40%"
                        height="3vw"
                        fontSize="xl"
                        borderRadius="lg"
                        marginTop={12}
                        >
                        Terbitkan Tiket
                        </Button>
                        <Button
                        colorPalette="purple"
                        variant="surface"
                        width="40%"
                        height="3vw"
                        fontSize="xl"
                        borderRadius="lg"
                        marginTop={5}
                        color="white"
                        >
                        Cari Penerbangan Lain
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
