'use client'; // This is a client component
import Chart from 'chart.js';
import React from 'react';

import { useEffect, useState } from 'react';

export default function CardBarChart() {
	const [allProdcuts, setAllProdcuts] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/products/all-products');
				const data = await response.json();
				setAllProdcuts(data.allProdcuts);
			} catch (error) {
				console.error('Error fetching total orders:', error);
			}
		};

		fetchData();
	}, []);
	React.useEffect(() => {
		// totalOrders.map((prod) => {
		// 	console.log('prod');
		// });

		let config = {
			type: 'bar',
			data: {
				labels: ['test'],
				datasets: [
					{
						label: 'Total',
						backgroundColor: '#4a5568',
						borderColor: '#4a5568',
						data: [30, 78, 56, 34, 100, 45, 13],
						fill: false,
						barThickness: 20,
					},
					// {
					// 	label: new Date().getFullYear() - 1,
					// 	fill: false,
					// 	backgroundColor: '#3182ce',
					// 	borderColor: '#3182ce',
					// 	data: [27, 68, 86, 74, 10, 4, 87],
					// 	barThickness: 8,
					// },
				],
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				title: {
					display: false,
					text: 'Orders Chart',
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true,
				},
				legend: {
					labels: {
						fontColor: '#000000',
					},
					align: 'end',
					position: 'bottom',
				},
				scales: {
					xAxes: [
						{
							display: true,
							scaleLabel: {
								display: false,
								labelString: 'Orders',
							},
							gridLines: {
								borderDash: [2],
								borderDashOffset: [2],
								color: '#000000',
								zeroLineColor: 'rgba(33, 37, 41, 0.3)',
								zeroLineBorderDash: [2],
								zeroLineBorderDashOffset: [2],
							},
						},
					],
					yAxes: [
						{
							display: true,
							scaleLabel: {
								display: false,
								labelString: 'Value',
							},
							gridLines: {
								borderDash: [2],
								drawBorder: false,
								borderDashOffset: [2],
								color: 'rgba(33, 37, 41, 0.2)',
								zeroLineColor: 'rgba(33, 37, 41, 0.15)',
								zeroLineBorderDash: [2],
								zeroLineBorderDashOffset: [2],
							},
						},
					],
				},
			},
		};
		let ctx = document.getElementById('bar-chart').getContext('2d');
		window.myBar = new Chart(ctx, config);
	}, []);
	return (
		<>
			<div className='relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg'>
				<div className='mb-0 rounded-t bg-transparent px-4 py-3'>
					<div className='flex flex-wrap items-center'>
						<div className='relative w-full max-w-full flex-1 flex-grow'>
							<h6 className='text-blueGray-400 mb-1 text-xs font-semibold uppercase'>Performance</h6>
							<h2 className='text-blueGray-700 text-xl font-semibold'>{allProdcuts}</h2>
						</div>
					</div>
				</div>
				<div className='flex-auto p-4'>
					{/* Chart */}
					<div className='h-350-px relative'>
						<canvas id='bar-chart'></canvas>
					</div>
				</div>
			</div>
		</>
	);
}
