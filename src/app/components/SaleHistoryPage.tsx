import StatisticsCard from '../components/StatisticsCard.tsx';

export default function SaleHistoryPage() {
	return (
		<>
			<section className='page-info'>
				<div>
					<div className='page-name'>
						<h2>Search history</h2>
					</div>
					<div>
						<p>Keep track of all past orders and view their status</p>
					</div>
				</div>

				<div className='search-filter'>
					<div className='search-bar'>
						<label
							className='sr-only'
							htmlFor='icon'
						>
							Search
						</label>
						<div>
							<div className='search-icon'>
								<i
									className='nav-icon'
									alt='search-icon'
									data-lucide='search'
								></i>
							</div>
							<input
								className=''
								id='icon'
								name='icon'
								type='text'
								placeholder='Search'
							/>
						</div>

						<div className='clear-icon'>
							<i
								className='nav-icon'
								alt='search-icon'
								data-lucide='delete'
							></i>
						</div>
					</div>

					<div className='filter-buttons'>
						<button type='button'>
							<p>sort</p>
							<i
								className='icon'
								alt='search-icon'
								data-lucide='arrow-down-up'
							></i>
						</button>
						<button type='button'>
							<p>filter</p>
							<i
								className='icon'
								alt='search-icon'
								data-lucide='list-filter'
							></i>
						</button>
					</div>
				</div>
			</section>
			<StatisticsCard></StatisticsCard>
			<section>
				<table className='order-table'>
					<thead className='table-head'>
						<tr>
							<th scope='col'>
								<div>
									<input
										id='checkbox-all'
										type='checkbox'
									/>
									<label htmlFor='checkbox-all'></label>
								</div>
							</th>
							<th scope='col'>
								<p>order</p>
							</th>
							<th scope='col'>
								<p>Date</p>
							</th>
							<th scope='col'>
								<p>item</p>
							</th>
							<th scope='col'>
								<p>Status</p>
							</th>
							<th scope='col'>
								<p>Address</p>
							</th>
							<th scope='col'>
								<p>Quantity</p>
							</th>
							<th scope='col'>
								<p>Amount</p>
							</th>
						</tr>
					</thead>
					<tbody
						className='table-body'
						id='sale-history-table'
					></tbody>
				</table>
			</section>
		</>
	);
}
