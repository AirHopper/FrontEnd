import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import "./seat.css";
import { 
  Flex,   
  Text, 
  Spinner,
  Box,
} from '@chakra-ui/react';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class App extends Component {
  addSeatCallback = ({ row, number, id }, addCb) => {
    addCb(row, number, id);
    this.props.setSelected(prevSeats => [...prevSeats, { id }])
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    removeCb(row, number);
    this.props.setSelected(prevSeats => prevSeats.filter(seat => seat.id !== id));
  };

  render() {
    const { data, seat, bookedSeats, selectedSeats } = this.props;
    if (!seat || seat.length === 0) {
      return (
        <Flex justifyContent="center" alignItems="center" height="100vh" bg="gray.100">
          <Spinner size="xl" color="teal.500" />
          <Text ml={4} fontSize="lg" color="gray.700" fontFamily="Inter, sans-serif">
            Memuat data kursi...
          </Text>
        </Flex>
      );
    }
    const row = [
      [
        { id: seat[0].id, number: 1, isReserved: false, isSelected : false },
        { id: seat[1].id, number: 2, isReserved: false, isSelected : false },
        { id: seat[2].id, number: 3, isReserved: false, isSelected : false },
        null,
        { id: seat[3].id, number: 4, isReserved: false, isSelected : false },
        { id: seat[4].id, number: 5, isReserved: false, isSelected : false },
        { id: seat[5].id, number: 6, isReserved: false, isSelected : false },
      ],
      [
        { id: seat[6].id, number: 7, isReserved: false, isSelected : false },
        { id: seat[7].id, number: 8, isReserved: false, isSelected : false },
        { id: seat[8].id, number: 9, isReserved: false, isSelected : false },
        null,
        { id: seat[9].id, number: 10, isReserved: false, isSelected : false },
        { id: seat[10].id, number: 11, isReserved: false, isSelected : false },
        { id: seat[11].id, number: 12, isReserved: false, isSelected : false },
      ],
    ];
    row.forEach((rowData) => {
      rowData.forEach((seat) => {
        if (
          seat &&
          bookedSeats.includes(seat.id) &&
          !selectedSeats.includes(seat.id)
        ) {
          seat.isReserved = true;
        }
      });
    });    
    if(!!selectedSeats){
      row.forEach((rowData) => {
        rowData.forEach((seat) => {
          if (seat && selectedSeats.includes(seat.id)) {
            seat.isSelected = true;
          }
        });
      });
    }
    const availableSeats = row.reduce((count, row) => {
      const availableInRow = row.filter((seat) => seat && !seat.isReserved).length;
      return count + availableInRow;
    }, 0);
    const modifiedRow = row.map(rowData => rowData.map(seat => {
      if (seat && seat.isReserved === true) {
        return { ...seat, number: "X"};
      }
      return seat;
    }));
    return (
      <div className="seat-container">
        {!!data &&(
          <>
            <Flex justifyContent="center" bg="#73CA5C" color="white" p={2} borderRadius="md" w="92%" marginLeft={5}>
              <Text fontFamily="Inter, sans-serif">Eksekutif - {availableSeats} Kursi Tersedia</Text>
            </Flex>
            <div className="seat-picker-container">
            <SeatPicker
                addSeatCallback={this.addSeatCallback.bind(this)} 
                removeSeatCallback={this.removeSeatCallback.bind(this)}
                rows={modifiedRow}
                maxReservableSeats={data?.totalPassengers}
                alpha
                visible
                readOnly
                selectedByDefault
              />
            </div>
          </>
        )}
        {!!!data &&(
          <>
            <Flex justifyContent="center">
              <Flex
                bg="#3C3C3C"
                color="white"
                borderTopRadius="lg"
                h={10}
                justifyContent="space-between"
                width="90%"
              >
                <Text marginLeft={4} marginTop={2}>
                  Eksekutif - {selectedSeats.length} Kursi Dipilih
                </Text>
                <Box marginTop={2} marginRight={5}>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    color="#73CA5C"
                    size="lg"
                  />
                </Box>
              </Flex>
            </Flex>
            <div className="seat-picker-container">
            <SeatPicker
                addSeatCallback={null}
                removeSeatCallback={null}
                rows={modifiedRow}
                maxReservableSeats={selectedSeats.length}
                alpha
                visible
                readOnly
                selectedByDefault
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
