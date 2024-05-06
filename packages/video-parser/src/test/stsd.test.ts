import {expect, test} from 'bun:test';
import {parseStsd} from '../boxes/iso-base-media/stsd/stsd';

test('Should be able to parse a STSD box correctly', () => {
	const buffer = Buffer.from([
		0, 0, 2, 92, 115, 116, 115, 100, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 76, 109,
		101, 98, 120, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 60, 107, 101, 121, 115, 0, 0,
		2, 52, 0, 0, 0, 1, 0, 0, 0, 47, 107, 101, 121, 100, 109, 100, 116, 97, 99,
		111, 109, 46, 97, 112, 112, 108, 101, 46, 113, 117, 105, 99, 107, 116, 105,
		109, 101, 46, 108, 105, 118, 101, 45, 112, 104, 111, 116, 111, 45, 105, 110,
		102, 111, 0, 0, 0, 67, 100, 116, 121, 112, 0, 0, 0, 1, 99, 111, 109, 46, 97,
		112, 112, 108, 101, 46, 113, 117, 105, 99, 107, 116, 105, 109, 101, 46, 99,
		111, 109, 46, 97, 112, 112, 108, 101, 46, 113, 117, 105, 99, 107, 116, 105,
		109, 101, 46, 108, 105, 118, 101, 45, 112, 104, 111, 116, 111, 45, 105, 110,
		102, 111, 0, 0, 0, 20, 115, 100, 112, 100, 0, 0, 0, 12, 115, 100, 112, 105,
		0, 0, 0, 0, 0, 0, 1, 142, 115, 101, 116, 117, 0, 0, 1, 118, 99, 102, 103,
		118, 98, 112, 108, 105, 115, 116, 48, 48, 211, 1, 2, 3, 4, 5, 12, 95, 16,
		33, 76, 105, 118, 101, 80, 104, 111, 116, 111, 77, 101, 116, 97, 100, 97,
		116, 97, 83, 101, 116, 117, 112, 68, 97, 116, 97, 86, 101, 114, 115, 105,
		111, 110, 93, 83, 121, 115, 116, 101, 109, 86, 101, 114, 115, 105, 111, 110,
		95, 16, 17, 70, 114, 97, 109, 101, 119, 111, 114, 107, 86, 101, 114, 115,
		105, 111, 110, 115, 16, 1, 211, 6, 7, 8, 9, 10, 11, 95, 16, 19, 80, 114,
		111, 100, 117, 99, 116, 66, 117, 105, 108, 100, 86, 101, 114, 115, 105, 111,
		110, 91, 80, 114, 111, 100, 117, 99, 116, 78, 97, 109, 101, 94, 80, 114,
		111, 100, 117, 99, 116, 86, 101, 114, 115, 105, 111, 110, 88, 50, 49, 70,
		53, 48, 52, 56, 102, 89, 105, 80, 104, 111, 110, 101, 32, 79, 83, 84, 49,
		55, 46, 53, 213, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 94, 72, 49, 51, 73,
		83, 80, 83, 101, 114, 118, 105, 99, 101, 115, 90, 67, 111, 114, 101, 77,
		111, 116, 105, 111, 110, 93, 67, 77, 67, 97, 112, 116, 117, 114, 101, 67,
		111, 114, 101, 94, 72, 49, 48, 73, 83, 80, 83, 101, 114, 118, 105, 99, 101,
		115, 89, 67, 111, 114, 101, 77, 101, 100, 105, 97, 85, 56, 46, 53, 48, 50,
		94, 50, 56, 57, 48, 46, 49, 54, 46, 49, 51, 46, 48, 46, 49, 87, 52, 55, 55,
		46, 50, 46, 49, 86, 50, 48, 46, 53, 48, 48, 88, 51, 49, 49, 48, 46, 52, 46,
		49, 0, 8, 0, 15, 0, 51, 0, 65, 0, 85, 0, 87, 0, 94, 0, 116, 0, 128, 0, 143,
		0, 152, 0, 162, 0, 167, 0, 178, 0, 193, 0, 204, 0, 218, 0, 233, 0, 243, 0,
		249, 1, 8, 1, 16, 1, 23, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 23, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 32, 0, 0, 0, 16, 100, 105, 109,
		115, 0, 0, 7, 128, 0, 0, 4, 56, 0, 0, 0, 24, 99, 116, 112, 115, 0, 0, 0, 16,
		100, 116, 121, 112, 0, 0, 0, 0, 0, 0, 0, 0,
	]);

	const parsed = parseStsd(buffer, 0);

	expect(parsed).toEqual({
		offset: 0,
		boxSize: 604,
		type: 'stsd-box',
		numberOfEntries: 1,
		descriptions: [
			{
				boxSize: 588,
				dataReferenceIndex: 1,
				format: 'mebx',
				offset: 16,
				type: 'mebx-box',
				children: [
					{
						boxSize: 572,
						boxType: 'keys',
						children: [],
						offset: 32,
						type: 'regular-box',
					},
				],
			},
		],
	});
});
