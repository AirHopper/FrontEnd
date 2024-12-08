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
    // this.props.setSelected(`Added seat ${number}, row ${row}, id ${id}`);
    addCb(row, number, id);
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    console.log(`Removed seat ${number}, row ${row}, id ${id}`);
    removeCb(row, number);
  };

  render() {
    const row = [
      [
        { id: 1, number: 1, isReserved: false },
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
          <Text fontFamily="Inter, sans-serif">Bisnis - {availableSeats} Kursi Tersedia</Text>
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
