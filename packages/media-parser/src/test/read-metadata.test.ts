import {exampleVideos} from '@remotion/example-videos';
import {expect, test} from 'bun:test';
import {getMetadata} from '../get-metadata';
import {parseMedia} from '../parse-media';
import {nodeReader} from '../readers/from-node';

test('iPhone metadata', async () => {
	const {structure} = await parseMedia({
		src: exampleVideos.iphonelivefoto,
		fields: {
			structure: true,
		},
		reader: nodeReader,
	});

	if (structure.type !== 'iso-base-media') {
		throw new Error('Expected video');
	}

	const metadata = getMetadata(structure);
	expect(metadata).toEqual([
		{
			key: 'com.apple.quicktime.location.accuracy.horizontal',
			trackId: null,
			value: '5.762147',
		},
		{
			key: 'com.apple.quicktime.live-photo.auto',
			trackId: null,
			value: 1,
		},
		{
			key: 'com.apple.quicktime.full-frame-rate-playback-intent',
			trackId: null,
			value: 1,
		},
		{
			key: 'com.apple.quicktime.content.identifier',
			trackId: null,
			value: '2C1C7C94-E977-45D0-9B3F-9A9CA8EFB47D',
		},
		{
			key: 'com.apple.quicktime.live-photo.vitality-score',
			trackId: null,
			value: 1,
		},
		{
			key: 'com.apple.quicktime.live-photo.vitality-scoring-version',
			trackId: null,
			value: 4,
		},
		{
			key: 'com.apple.quicktime.location.ISO6709',
			trackId: null,
			value: '+47.3915+008.5121+404.680/',
		},
		{
			key: 'com.apple.quicktime.make',
			trackId: null,
			value: 'Apple',
		},
		{
			key: 'com.apple.quicktime.model',
			trackId: null,
			value: 'iPhone 15 Pro',
		},
		{
			key: 'com.apple.quicktime.software',
			trackId: null,
			value: '18.0',
		},
		{
			key: 'com.apple.quicktime.creationdate',
			trackId: null,
			value: '2024-10-01T12:46:18+0200',
		},
		{
			key: 'com.apple.quicktime.camera.lens_model',
			trackId: 1,
			value: 'iPhone 15 Pro back camera 6.765mm f/1.78',
		},
		{
			key: 'com.apple.quicktime.camera.focal_length.35mm_equivalent',
			trackId: 1,
			value: 23,
		},
	]);
});
