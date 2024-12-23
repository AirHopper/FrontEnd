import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import "./seat.css";
import { 
  Flex,  
  Text, 
  Spinner,
  Box
} from '@chakra-ui/react';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class App extends Component {
  addSeatCallback = ({ row, number, id}, addCb) => {
    addCb(row, number, id);
    this.props.setSelected(prevSeats => [...prevSeats, { id }]);
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
      [
        { id: seat[12].id, number: 13, isReserved: false, isSelected : false },
        { id: seat[13].id, number: 14, isReserved: false, isSelected : false },
        { id: seat[14].id, number: 15, isReserved: false, isSelected : false },
        null,
        { id: seat[15].id, number: 16, isReserved: false, isSelected : false },
        { id: seat[16].id, number: 17, isReserved: false, isSelected : false },
        { id: seat[17].id, number: 18, isReserved: false, isSelected : false },
      ],
      [
        { id: seat[18].id, number: 19, isReserved: false, isSelected : false },
        { id: seat[19].id, number: 20, isReserved: false, isSelected : false },
        { id: seat[20].id, number: 21, isReserved: false, isSelected : false },
        null,
        { id: seat[21].id, number: 22, isReserved: false, isSelected : false },
        { id: seat[22].id, number: 23, isReserved: false, isSelected : false },
        { id: seat[23].id, number: 24, isReserved: false, isSelected : false },
      ],
      [
        { id: seat[24].id, number: 25, isReserved: false, isSelected : false },
        { id: seat[25].id, number: 26, isReserved: false, isSelected : false },
        { id: seat[26].id, number: 27, isReserved: false, isSelected : false },
        null,
        { id: seat[27].id, number: 28, isReserved: false, isSelected : false },
        { id: seat[28].id, number: 29, isReserved: false, isSelected : false },
        { id: seat[29].id, number: 30, isReserved: false, isSelected : false },
      ],
      [
        { id: seat[30].id, number: 31, isReserved: false, isSelected : false },
        { id: seat[31].id, number: 32, isReserved: false, isSelected : false },
        { id: seat[32].id, number: 33, isReserved: false, isSelected : false },
        null,
        { id: seat[33].id, number: 34, isReserved: false, isSelected : false },
        { id: seat[34].id, number: 35, isReserved: false, isSelected : false },
        { id: seat[35].id, number: 36, isReserved: false, isSelected : false },
      ],
      [
        { id: seat[36].id, number: 37, isReserved: false, isSelected : false },
        { id: seat[37].id, number: 38, isReserved: false, isSelected : false },
        { id: seat[38].id, number: 39, isReserved: false, isSelected : false },
        null,
        { id: seat[39].id, number: 40, isReserved: false, isSelected : false },
        { id: seat[40].id, number: 41, isReserved: false, isSelected : false },
        { id: seat[41].id, number: 42, isReserved: false, isSelected : false },
      ],
      [
        { id: seat[42].id, number: 43, isReserved: false, isSelected : false },
        { id: seat[43].id, number: 44, isReserved: false, isSelected : false },
        { id: seat[44].id, number: 45, isReserved: false, isSelected : false },
        null,
        { id: seat[45].id, number: 46, isReserved: false, isSelected : false },
        { id: seat[46].id, number: 47, isReserved: false, isSelected : false },
        { id: seat[47].id, number: 48, isReserved: false, isSelected : false },
      ],
      [
        { id: seat[48].id, number: 49, isReserved: false, isSelected : false },
        { id: seat[49].id, number: 50, isReserved: false, isSelected : false },
        { id: seat[50].id, number: 51, isReserved: false, isSelected : false },
        null,
        { id: seat[51].id, number: 52, isReserved: false, isSelected : false },
        { id: seat[52].id, number: 53, isReserved: false, isSelected : false },
        { id: seat[53].id, number: 54, isReserved: false, isSelected : false },
      ],
      [
        { id: seat[54].id, number: 55, isReserved: false, isSelected : false },
        { id: seat[55].id, number: 56, isReserved: false, isSelected : false },
        { id: seat[56].id, number: 57, isReserved: false, isSelected : false },
        null,
        { id: seat[57].id, number: 58, isReserved: false, isSelected : false },
        { id: seat[58].id, number: 59, isReserved: false, isSelected : false },
        { id: seat[59].id, number: 60, isReserved: false, isSelected : false },
      ],
      [
        { id: seat[60].id, number: 61, isReserved: false, isSelected : false },
        { id: seat[61].id, number: 62, isReserved: false, isSelected : false },
        { id: seat[62].id, number: 63, isReserved: false, isSelected : false },
        null,
        { id: seat[63].id, number: 64, isReserved: false, isSelected : false },
        { id: seat[64].id, number: 65, isReserved: false, isSelected : false },
        { id: seat[65].id, number: 66, isReserved: false, isSelected : false },
      ],
      [
        { id: seat[66].id, number: 67, isReserved: false, isSelected : false },
        { id: seat[67].id, number: 68, isReserved: false, isSelected : false },
        { id: seat[68].id, number: 69, isReserved: false, isSelected : false },
        null,
        { id: seat[69].id, number: 70, isReserved: false, isSelected : false },
        { id: seat[70].id, number: 71, isReserved: false, isSelected : false },
        { id: seat[71].id, number: 72, isReserved: false, isSelected : false },
      ]
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
              <Text fontFamily="Inter, sans-serif">Economy - {availableSeats} Kursi Tersedia</Text>
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
                  Economy - {selectedSeats.length} Kursi Dipilih
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
