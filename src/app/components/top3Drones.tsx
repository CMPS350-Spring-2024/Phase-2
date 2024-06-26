'use client';

import Chart from 'chart.js';
import { useEffect, useState } from 'react';

export default function CardBarChart2() {
	const [top3Drones, setTop3Drones] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/products/top3');
				const data = await response.json();
				setTop3Drones(data);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		fetchData();
	}, []);

	// console.log(top3Drones);

	useEffect(() => {
		if (top3Drones.length > 0) {
			const labels = top3Drones.map((product) => product.name);
			const data = top3Drones.map((product) => product.numberOfSales);
			const backgroundColor = ['#4a5568', '#3182ce', '#3152ce'];

			let config = {
				type: 'bar',
				data: {
					labels,
					datasets: [
						{
							label: 'Quantity',
							backgroundColor,
							borderColor: backgroundColor,
							data,
							fill: false,
						},
					],
				},
				options: {
					maintainAspectRatio: false,
					responsive: true,
					title: {
						display: false,
						text: 'Top 3 Drones',
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
								barPercentage: 0.95,
								display: true,
								scaleLabel: {
									display: false,
									labelString: 'Drones',
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
								ticks: {
									display: true,
									beginAtZero: true,
								},
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Quantity',
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

			let ctx = document.getElementById('bar-chart2').getContext('2d');
			window.myBar = new Chart(ctx, config);
		}
	}, [top3Drones]);

	return (
		<>
			<div className='relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg'>
				<div className='mb-0 rounded-t bg-transparent px-4 py-3'>
					<div className='flex flex-wrap items-center'>
						<div className='relative w-full max-w-full flex-1 flex-grow'>
							<h6 className='text-blueGray-400 mb-1 text-xs font-semibold uppercase'>Top Sellers</h6>
							<h2 className='text-blueGray-700 text-xl font-semibold'>Top 3 Drones</h2>
						</div>
					</div>
				</div>
				<div className='flex-auto p-4'>
					<div className='h-350-px relative'>
						<canvas id='bar-chart2'></canvas>
					</div>
				</div>
			</div>
		</>
	);
}
