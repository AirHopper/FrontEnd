import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import "./seat.css";
import { 
  Flex,   
  Text, 
} from '@chakra-ui/react';

export default class App extends Component {
  addSeatCallback = ({ row, number, id }, addCb) => {
    console.log(`Added seat ${number}, row ${row}, id ${id}`);
    addCb(row, number, id);
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    console.log(`Removed seat ${number}, row ${row}, id ${id}`);
    removeCb(row, number);
  };

  render() {
    const row = [
      [
        { id: 1, number: 1, isReserved: true },
        { id: 2, number: 2, isReserved: false },
        { id: 3, number: 3, isReserved: false },
        null,
        { id: 4, number: 4, isReserved: false },
        { id: 5, number: 5, isReserved: false },
        { id: 6, number: 6, isReserved: false },
      ],
      [
        { id: 7, number: 7, isReserved: false },
        { id: 8, number: 8, isReserved: true },
        { id: 9, number: 9, isReserved: false },
        null,
        { id: 10, number: 10, isReserved: false },
        { id: 11, number: 11, isReserved: false },
        { id: 12, number: 12, isReserved: false },
      ],
      [
        { id: 13, number: 13, isReserved: false },
        { id: 14, number: 14, isReserved: false },
        { id: 15, number: 15, isReserved: false },
        null,
        { id: 16, number: 16, isReserved: false },
        { id: 17, number: 17, isReserved: false },
        { id: 18, number: 18, isReserved: false },
      ],
      [
        { id: 19, number: 19, isReserved: false },
        { id: 20, number: 20, isReserved: false },
        { id: 21, number: 21, isReserved: false },
        null,
        { id: 22, number: 22, isReserved: false },
        { id: 23, number: 23, isReserved: false },
        { id: 24, number: 24, isReserved: false },
      ],
      [
        { id: 25, number: 25, isReserved: false },
        { id: 26, number: 26, isReserved: false },
        { id: 27, number: 27, isReserved: false },
        null,
        { id: 28, number: 28, isReserved: false },
        { id: 29, number: 29, isReserved: false },
        { id: 30, number: 30, isReserved: false },
      ],
      [
        { id: 31, number: 31, isReserved: false },
        { id: 32, number: 32, isReserved: false },
        { id: 33, number: 33, isReserved: false },
        null,
        { id: 34, number: 34, isReserved: false },
        { id: 35, number: 35, isReserved: false },
        { id: 36, number: 36, isReserved: false },
      ],
      [
        { id: 37, number: 37, isReserved: false },
        { id: 38, number: 38, isReserved: false },
        { id: 38, number: 38, isReserved: false },
        null,
        { id: 39, number: 39, isReserved: false },
        { id: 40, number: 40, isReserved: false },
        { id: 41, number: 41, isReserved: false },
      ],
      [
        { id: 42, number: 42, isReserved: false },
        { id: 43, number: 43, isReserved: false },
        { id: 45, number: 45, isReserved: false },
        null,
        { id: 46, number: 46, isReserved: false },
        { id: 47, number: 47, isReserved: false },
        { id: 48, number: 48, isReserved: false },
      ],
      [
        { id: 49, number: 49, isReserved: false },
        { id: 50, number: 50, isReserved: false },
        { id: 51, number: 51, isReserved: false },
        null,
        { id: 52, number: 52, isReserved: false },
        { id: 53, number: 53, isReserved: false },
        { id: 54, number: 54, isReserved: false },
      ],
      [
        { id: 55, number: 55, isReserved: false },
        { id: 56, number: 56, isReserved: false },
        { id: 57, number: 57, isReserved: false },
        null,
        { id: 58, number: 58, isReserved: false },
        { id: 59, number: 59, isReserved: false },
        { id: 60, number: 60, isReserved: false },
      ],
      [
        { id: 61, number: 61, isReserved: false },
        { id: 62, number: 62, isReserved: false },
        { id: 63, number: 63, isReserved: false },
        null,
        { id: 64, number: 64, isReserved: false },
        { id: 65, number: 65, isReserved: false },
        { id: 66, number: 66, isReserved: false },
      ],
      [
        { id: 67, number: 67, isReserved: false },
        { id: 68, number: 68, isReserved: false },
        { id: 69, number: 69, isReserved: false },
        null,
        { id: 70, number: 70, isReserved: false },
        { id: 71, number: 71, isReserved: false },
        { id: 72, number: 72, isReserved: false },
      ]
    ];
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
        <Flex justifyContent="center" bg="#73CA5C" color="white" p={2} borderRadius="md" w="92%" marginLeft={5}>
          <Text fontFamily="Inter, sans-serif">Ekonomi - {availableSeats} Kursi Tersedia</Text>
        </Flex>
        <div className="seat-picker-container">
        <SeatPicker
            addSeatCallback={this.addSeatCallback.bind(this)}
            removeSeatCallback={this.removeSeatCallback.bind(this)}
            rows={modifiedRow}
            maxReservableSeats={3}
            alpha
            visible
            selectedByDefault
          />
        </div>
      </div>
    );
  }
}
