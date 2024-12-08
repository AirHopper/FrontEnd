import { useRef, useEffect } from 'react';
import { CloseButton } from '../ui/close-button';
import { DateRange, Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Box } from '@chakra-ui/react';

const DatePicker = ({ isRangeMode, handleClose, dateRange, setDateRange, singleDate, focusedRange, setSingleDate, setIsPickerOpen }) => {
	const pickerRef = useRef();

	const handleRangeChange = item => {
		setDateRange([item.selection]);
		setIsPickerOpen(false);
		handleClose();
	};

	const handleSingleDateChange = date => {
		setSingleDate(date);
		setIsPickerOpen(false);
		handleClose();
	};

	const handleManualClose = () => {
		setIsPickerOpen(false);
		handleClose();
	};

	return (
		<Box position="fixed" top={0} left={0} width="100%" height="100%" bg="rgba(0, 0, 0, 0.5)" zIndex="9">
			<Box
				position="absolute"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				bg="white"
				shadow="lg"
				transition="all 0.3s ease"
				zIndex="10"
				ref={pickerRef}
				borderRadius="md"
				overflow="hidden"
				maxHeight="90vh"
				width="90%"
				maxWidth="50vh"
			>
				<Box position="relative">
					{/* CloseButton hanya akan menutup DatePicker */}
					<CloseButton aria-label="Close Picker" position="absolute" top="4px" right="4px" size="sm" onClick={handleManualClose} />
				</Box>
				{isRangeMode ? <DateRange editableDateInputs onChange={handleRangeChange} color="#44b3f8" ranges={dateRange} focusedRange={focusedRange} /> : <Calendar date={singleDate} color="#44b3f8" onChange={handleSingleDateChange} />}
			</Box>
		</Box>
	);
};

export default DatePicker;
