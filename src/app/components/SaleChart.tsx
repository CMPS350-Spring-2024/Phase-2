'use client'; // This is a client component
import Chart from 'chart.js';
import React from 'react';

export default function CardLineChart() {
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth();
	const currentDay = new Date().getDay();
	const monthNow = new Intl.DateTimeFormat('eng', { month: 'long' }).format(new Date(currentYear, currentMonth, currentDay));
	const prev_month = new Intl.DateTimeFormat('eng', { month: 'long' }).format(
		new Date(currentYear, currentMonth - 1, currentDay),
	);
	const befo_prev_month = new Intl.DateTimeFormat('eng', { month: 'long' }).format(
		new Date(currentYear, currentMonth - 2, currentDay),
	);

	React.useEffect(() => {
		var config = {
			type: 'line',
			data: {
				labels: [befo_prev_month, prev_month, monthNow], //, '...', '...', '...', '...'],
				datasets: [
					{
						label: new Date().getFullYear(),
						backgroundColor: '#3182ce',
						borderColor: '#3182ce',
						data: [65, 78, 66],
						fill: true,
					},
					// {
					// 	label: new Date().getFullYear() - 1,
					// 	fill: true,
					// 	backgroundColor: '#000000',
					// 	borderColor: '#000000',
					// 	data: [40, 68, 86, 74, 56, 60, 87],
					// },
				],
			},
			options: {
				maintainAspectRatio: false,
				responsive: true,
				title: {
					display: false,
					text: 'Sales Charts',
					fontColor: 'black',
				},
				legend: {
					labels: {
						fontColor: 'black',
					},
					align: 'end',
					position: 'bottom',
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true,
				},
				scales: {
					xAxes: [
						{
							ticks: {
								fontColor: '#000000',
							},
							display: true,
							scaleLabel: {
								display: false,
								labelString: 'Month',
								fontColor: 'black',
							},
							gridLines: {
								display: false,
								borderDash: [2],
								borderDashOffset: [2],
								color: '#000000',
								zeroLineColor: '#000000',
								zeroLineBorderDash: [2],
								zeroLineBorderDashOffset: [2],
							},
						},
					],
					yAxes: [
						{
							ticks: {
								fontColor: '#000000',
							},
							display: true,
							scaleLabel: {
								display: false,
								labelString: 'Value',
								fontColor: 'black',
							},
							gridLines: {
								borderDash: [3],
								borderDashOffset: [3],
								drawBorder: false,
								color: '#808080  ',
								zeroLineColor: '#000000',
								zeroLineBorderDashOffset: [2],
							},
						},
					],
				},
			},
		};
		var ctx = document.querySelector<HTMLCanvasElement>('#line-chart').getContext('2d');
		window.myLine = new Chart(ctx, config);
	}, []);
	return (
		<>
			<div className='bg-blueGray-700 relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg'>
				<div className='mb-0 rounded-t bg-transparent px-4 py-3'>
					<div className='flex flex-wrap items-center'>
						<div className='relative w-full max-w-full flex-1 flex-grow'>
							<h6 className='text-blueGray-100 mb-1 text-xs font-semibold uppercase'>Overview</h6>
							<h2 className='text-xl font-semibold text-black'>Sales value</h2>
						</div>
					</div>
				</div>
				<div className='flex-auto p-4'>
					{/* Chart */}
					<div className='h-350-px relative'>
						<canvas id='line-chart'></canvas>
					</div>
				</div>
			</div>
		</>
	);
}
