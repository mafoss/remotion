import {createReadStream} from 'fs';
import type {BaseBox} from './boxes/iso-base-media/base-type';
import type {DimensionsBox} from './boxes/iso-base-media/dims';
import type {FtypBox} from './boxes/iso-base-media/ftype';
import type {MvhdBox} from './boxes/iso-base-media/mvhd';
import {parseBoxes} from './boxes/iso-base-media/process-box';
import type {MebxBox} from './boxes/iso-base-media/stsd/mebx';
import type {StsdBox} from './boxes/iso-base-media/stsd/stsd';
import type {TkhdBox} from './boxes/iso-base-media/tkhd';

interface RegularBox extends BaseBox {
	boxType: string;
	boxSize: number;
	children: Box[];
	offset: number;
	type: 'regular-box';
}

export type Box =
	| RegularBox
	| FtypBox
	| MvhdBox
	| TkhdBox
	| DimensionsBox
	| StsdBox
	| MebxBox;

const isoBaseMediaMp4Pattern = Buffer.from('ftyp');

const matchesPattern = (pattern: Buffer) => {
	return (data: Buffer) => {
		return pattern.every((value, index) => data[index] === value);
	};
};

export const parseVideo = async (
	src: string,
	bytes: number,
): Promise<Box[]> => {
	const stream = createReadStream(
		src,
		Number.isFinite(bytes) ? {end: bytes - 1} : {},
	);
	const data = await new Promise<Buffer>((resolve, reject) => {
		const buffers: Buffer[] = [];

		stream.on('data', (chunk) => {
			buffers.push(chunk as Buffer);
		});

		stream.on('end', () => {
			resolve(Buffer.concat(buffers));
		});

		stream.on('error', (err) => {
			reject(err);
		});
	});

	if (matchesPattern(isoBaseMediaMp4Pattern)(data.subarray(4, 8))) {
		return parseBoxes(data, 0);
	}

	return [];
};
