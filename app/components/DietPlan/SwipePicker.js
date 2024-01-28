import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import { FlatList, Text, StyleSheet, View } from 'react-native'


const ListItem = React.memo(({ label, style }) => (
	<View style={style}>
		<Text>{label}</Text>
	</View>
));

const SwipePicker = ({ items, onChange, initialSelectedIndex = null, width, height }) => {
	let itemHeight = 40;
	let listHeight = 200;

	if (height) {
		listHeight = height;
		itemHeight = listHeight / 5;
	}

	const styles = StyleSheet.create({
		list: {
			height: listHeight,
			width: width
		},
		listItem: {
			height: itemHeight,
			alignItems: 'center',
			justifyContent: 'center',
			fontSize: itemHeight / 2,
			borderWidth:0,
			borderTopWidth: 1,
			borderBottomWidth: 1,
			borderColor: '#BDBDBD'
		},
		pickerGradient: {
			position: 'absolute',
			height: 2 * itemHeight,
			width: '100%',
			borderWidth: 0
		},
		topGradient: {
			top: 0,
		},
		bottomGradient: {
			bottom: 0,
			borderWidth: 0,
			borderColor: 'white'
		}
	});

	const flatList = useRef(null);

	let extendedItems = [
		{
			value: -11,
			label: ''
		},
		{
			value: -12,
			label: ''
		},
		...items,
		{
			value: -21,
			label: ''
		},
		{
			value: -22,
			label: ''
		}];

	return (
		<View style={styles.list} >
			<FlatList
				onMomentumScrollEnd={(event) => {
					let index = Math.round(event.nativeEvent.contentOffset.y / itemHeight);
					onChange({ index, item: items[index] });
				}}
				initialScrollIndex={initialSelectedIndex}
				persistentScrollbar={false}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				ref={flatList}
				data={extendedItems.map(item => ({
					key: item.value.toString(),
					...item
				}))}
				renderItem={item => (
					<ListItem
						label={item.item.label}
						style={styles.listItem} />
				)}
				getItemLayout={(_, index) => ({ length: itemHeight, offset: index * itemHeight, index })}
				snapToInterval={itemHeight}
				ListEmptyComponent={() => <Text>No Items</Text>}
			/>
			<View
				colors={[
					'rgba( 255, 255, 255, 1 )',
					'rgba( 255, 255, 255, 0.9 )',
					'rgba( 255, 255, 255, 0.7 )',
					'rgba( 255, 255, 255, 0.5 )'
				]}
				style={[styles.pickerGradient, styles.topGradient]}
				pointerEvents="none"
			/>
			<View
				colors={[
					'rgba( 255, 255, 255, 0.5 )',
					'rgba( 255, 255, 255, 0.7 )',
					'rgba( 255, 255, 255, 0.9 )',
					'rgba( 255, 255, 255, 1 )',
				]}
				style={[styles.pickerGradient, styles.bottomGradient]}
				pointerEvents="none"
			/>
		</View>
	)
}

SwipePicker.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		label: PropTypes.string
	})),
	onChange: PropTypes.func,
	initialSelectedIndex: PropTypes.number,
	height: PropTypes.number,
	width: PropTypes.number
}

export default SwipePicker;