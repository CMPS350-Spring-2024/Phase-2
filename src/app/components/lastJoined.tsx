'use client'; // This is a client component

import Chart from 'chart.js';
import { useEffect, useState } from 'react';

export default function LastJoinedUsers() {
	const [last3Joined, setLast3Joined] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/users/last3');
				const data = await response.json();
				setLast3Joined(data);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (last3Joined.length > 0) {
			const labels = last3Joined.map((user) => `${user.firstName} ${user.lastName}`);
			const colors = ['#3182ce', '#dc2626', '#16a34a'];
			var config = {
				type: 'line',
				data: {
					labels,
					datasets: [
						{
							label: 'Last Registered Users',
							backgroundColor: colors.slice(0, last3Joined.length),
							borderColor: colors.slice(0, last3Joined.length),
							data: last3Joined.map(() => 1),
							fill: false,
							pointRadius: 10,
							pointHoverRadius: 15,
							showLine: false,
						},
					],
				},
				options: {
					maintainAspectRatio: false,
					responsive: true,
					title: {
						display: true,
						text: 'Last Registered Users',
						fontColor: 'black',
					},
					legend: {
						display: false,
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
								},
								gridLines: {
									display: false,
								},
							},
						],
						yAxes: [
							{
								ticks: {
									display: false,
								},
								display: true,
								scaleLabel: {
									display: false,
								},
								gridLines: {
									display: false,
								},
							},
						],
					},
				},
			};

			var ctx = document.querySelector<HTMLCanvasElement>('#last-joined-users').getContext('2d');
			window.myLine = new Chart(ctx, config);
		}
	}, [last3Joined]);

	return (
		<>
			<div className='bg-blueGray-700 relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg'>
				<div className='mb-0 rounded-t bg-transparent px-4 py-3'>
					<div className='flex flex-wrap items-center'>
						<div className='relative w-full max-w-full flex-1 flex-grow'>
							<h6 className='text-blueGray-100 mb-1 text-xs font-semibold uppercase'>User Registration</h6>
							<h2 className='text-xl font-semibold text-black'>Last 3 Registered Users</h2>
						</div>
					</div>
				</div>
				<div className='flex-auto p-4'>
					<div className='h-350-px relative'>
						<canvas id='last-joined-users'></canvas>
					</div>
				</div>
			</div>
		</>
	);
}
