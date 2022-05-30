import { Grid, GridItem, Icon, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import './HorizontalDatePicker.css';
import moment from 'moment';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

function HorizontalDatePicker(props:any) {
    const [date, setdate] = useState(new Date());
    const [week, setWeek] = useState(new Array());
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [dateColored, setDateColored] = useState(new Date());

    const getWeekList = () => {
        setWeek([]);
        var curr = new Date(date); // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var diff = curr.getDate() - curr.getDay();
  
        const diffDate = new Date(date.setDate(diff));
        
        setMonth(curr.toLocaleString('default', { month: 'long' }));
        setYear(curr.toLocaleString('default', { year: 'numeric' }));

        for (let i = 0; i < 7; i++) {
            let newDate: any;
    
            if (i === 0 && i < 1) {
                newDate = { date: new Date(diffDate.setDate(diffDate.getDate())), day: diffDate.getDate() };
            } else {
                newDate = { date: new Date(diffDate.setDate(diffDate.getDate() + 1)), day: diffDate.getDate() };
            }
            setWeek(week => [...week, newDate]);
        }
        props.datepickerEventHandler(curr);
    }

    const nextWeekList = () => {
        setdate(new Date(date.setDate(date.getDate() + 7)));
        setDateColored(date);
        getWeekList();
    }

    const prevWeekList = () => {
        setdate(new Date(date.setDate(date.getDate() - 7)));
        setDateColored(date);
        getWeekList();
    }

    useEffect(() => {
        getWeekList();
        
    }, []);

    const handleDateEvent = (dateVal: any) => {        
        setDateColored(dateVal);
        props.datepickerEventHandler(dateVal);
    }
    return (
        <div>
            <Grid templateColumns='repeat(8, 1fr)' textAlign="center" mt={2} mb={3}>
                <GridItem colSpan={1} onClick={prevWeekList}>
                    <Icon as={ChevronLeftIcon} w={6} h={6} className="icon_btn"/>
                </GridItem>
                <GridItem colSpan={6} fontWeight="normal" fontSize="xl">
                    {month} {year}
                </GridItem>
                <GridItem colSpan={1} onClick={nextWeekList}>
                    <Icon as={ChevronRightIcon} w={6} h={6} className="icon_btn"/>
                </GridItem>
            </Grid>
            <TableContainer>
                <Table variant='simple' size='sm'>
                    <Thead>
                        <Tr>
                            <Th style={{ padding: "0px 10px", textAlign: "center" }}>Sun</Th>
                            <Th style={{ padding: "0px 10px", textAlign: "center" }}>Mon</Th>
                            <Th style={{ padding: "0px 10px", textAlign: "center" }}>Tue</Th>
                            <Th style={{ padding: "0px 10px", textAlign: "center" }}>Wed</Th>
                            <Th style={{ padding: "0px 10px", textAlign: "center" }}>Thu</Th>
                            <Th style={{ padding: "0px 10px", textAlign: "center" }}>Fri</Th>
                            <Th style={{ padding: "0px 10px", textAlign: "center" }}>Sat</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            {week.map((item, key) => {
                                return <Td key={key} onClick={() => handleDateEvent(item.date)} className={(moment(dateColored).format('D-M-YYYY') === moment(item.date).format('D-M-YYYY') ? 'selectedDate' : 'date')}>{item.day}</Td>
                            })}
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Text mt={5} className="primary-text">{moment(dateColored).format('Do MMM YYYY')}</Text>
        </div>
    )
}

export default HorizontalDatePicker
