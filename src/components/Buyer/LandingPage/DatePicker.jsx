import { CloseButton } from '@/components/ui/close-button';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Box, HStack } from '@chakra-ui/react';

const DatePicker = ({ dateRange, setDateRange, setIsPickerOpen }) => {
	const handleManualClose = () => {
		setIsPickerOpen(false);
	};

	return (
		<Box position="fixed" top={0} left={0} width="100%" height="100%" bg="rgba(0, 0, 0, 0.5)" zIndex="9">
			<Box position="absolute" top="60%" left="70%" transform="translate(-50%, -50%)" bg="white" shadow="lg" transition="all 0.3s ease" zIndex="10" borderRadius="md">
				<HStack borderRadius="none" justifySelf="end">
					{/* CloseButton hanya akan menutup DatePicker */}
					<CloseButton aria-label="Close Picker" onClick={handleManualClose} rounded="none" borderTopRightRadius="md" />
				</HStack>

				<Box borderTopWidth="2px" pb="4">
					<DateRange
						editableDateInputs={true}
						onChange={item => setDateRange([item.selection])}
						color="#44b3f8"
						ranges={dateRange}
						rangeColors="#44b3f8"
						showMonthAndYearPickers={false}
						showDateDisplay={false}
						moveRangeOnFirstSelection={false}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default DatePicker;
