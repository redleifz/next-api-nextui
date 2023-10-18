'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/react";
import axios from 'axios';
import { getUserInfo } from '@/utils/service';
import moment from 'moment/moment';

const Dashboard = () => {

    const startDateTime = '2021-01-01';
    const endDateTime = '2023-12-31';
    const size = 10;

    const [totalPage, setTotalPage] = useState(null);
    const [dataContent, setDataContent] = useState([]);
    const [page, setPage] = useState(0);

    const fetchIncomingData = async () => {
        const token = getUserInfo()
  
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.accessToken}`;


        try {
            const { data } = await axios.get(`/api/incoming?startDateTime=${startDateTime}&endDateTime=${endDateTime}&page=${page}&size=${size}`);
            setTotalPage(data.data.totalPages);
            setDataContent(data.data.content);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchIncomingData();
    }, [page])

    return (
        <>
            <div className="flex flex-col p-5">
                <Table isStriped aria-label="Example static collection table"
                    bottomContent={
                        <div className="flex w-full justify-end">
                              <Pagination className='mt-1' 
                              total={totalPage-1} 
                            //   page={page}
                              initialPage={page+1} 
                              onChange={(page) => setPage(page)}
                              />
                            {/* <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={totalPage}
                                initialPage={10}
                                onChange={(page) => setPage(page)}
                            /> */}
                        </div>
                    }>
                    <TableHeader>
                        <TableColumn>aniNumber</TableColumn>
                        <TableColumn>callcode</TableColumn>
                        <TableColumn>durationcall</TableColumn>
                        <TableColumn>durationtalk</TableColumn>
                        <TableColumn>durationwait</TableColumn>
                        <TableColumn>extNo</TableColumn>
                        <TableColumn>queue</TableColumn>
                        <TableColumn>recordTime</TableColumn>
                        <TableColumn>startTime</TableColumn>
                        <TableColumn>stopTime</TableColumn>
                        <TableColumn>talkStart</TableColumn>
                        <TableColumn>transferStatus</TableColumn>
                        <TableColumn>transferTime</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {
                            dataContent.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.aniNumber}</TableCell>
                                    <TableCell>{item.callcode}</TableCell>
                                    <TableCell>{item.durationcall}</TableCell>
                                    <TableCell>{item.durationtalk}</TableCell>
                                    <TableCell>{item.durationwait}</TableCell>
                                    <TableCell>{item.extNo}</TableCell>
                                    <TableCell>{item.queue}</TableCell>
                                    <TableCell>{item.recordTime}</TableCell>
                                    <TableCell>{moment(item.startTime).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                                    <TableCell>{item.stopTime}</TableCell>
                                    <TableCell>{item.talkStart}</TableCell>
                                    <TableCell>{item.transferStatus}</TableCell>
                                    <TableCell>{item.transferTime}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    {/* <Pagination className='mt-1' total={totalPage} initialPage={1} /> */}
                </Table>
                <div className='flex justify-end'>

                </div>

            </div>
        </>
    )
}

export default Dashboard