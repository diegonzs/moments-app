import * as React from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import moment from 'moment';
import { Icon } from 'components/icon';
import { BodyText, Subtitle, Title } from 'components/typography';
import { useModal } from 'hooks/use-modal';
import { useWindowSize } from 'hooks/use-window-size';
import { Alert } from 'components/alert';
import { FullMedia } from 'components/full-media';
import { VoiceRecorder } from 'components/voice-recorder';
import { MediaBox } from 'components/create-moment/media-box';
import {
	createIndex,
	createProcess,
	createSRWMoment,
	createTag,
} from 'gql/mutations';
import { useUser } from 'hooks/user/useUser';
import { GetServerSideProps } from 'next';
import { useIndexes, useMoments, useProcesses, useTags } from 'hooks/api';
import { useBackgroundPage, useIsCreatingMoment } from 'hooks';
import { Trans, t } from '@lingui/macro';
import {
	BookmarkIcon,
	ChevronRightIcon,
	HashtagIcon,
	MicrophoneIcon,
	PhotographIcon,
} from '@heroicons/react/outline';
import { CreateItem } from 'components/create-item';
import { Moments } from 'types/schema-types';

type ImageUploadType = {
	file: File;
	url: string;
};

const Create = () => {
	useBackgroundPage('bg-background-nav');
	const router = useRouter();
	const { type } = router.query;
	const { height } = useWindowSize();
	const user = useUser();
	const { handleCreateMoment } = useIsCreatingMoment();
	const { mutate: mutateMoments } = useMoments();
	const { tags, mutate: mutateTags } = useTags();
	const { processes, mutate: mutateProcess } = useProcesses();
	const { indexes, mutate: mutateIndexes } = useIndexes();

	const { Modal, isShow, hide, show } = useModal();

	const [modalType, setModalType] = React.useState<
		'cancel' | 'voice' | 'media-preview' | 'process' | 'index'
	>('cancel');

	const [defaultPreviewIndex, setDefaultPreviewIndex] = React.useState(0);
	const [isHashtagListShow, setIsHashtagListShow] = React.useState(false);

	const contentRef = React.useRef<HTMLTextAreaElement>(null);

	const [content, setContent] = React.useState<string>('');
	const [selectedProcess, setSelectedProcess] = React.useState<{
		title: string;
		id: string;
	} | null>(null);
	const [selectedIndex, setSelectedIndex] = React.useState<{
		title: string;
		id: string;
	} | null>(null);
	const [emojiSelected] = React.useState<{
		key: string;
		value: string;
	} | null>(null);

	const [images, setImages] = React.useState<ImageUploadType[]>([]);
	const [videos, setVideos] = React.useState<ImageUploadType[]>([]);
	const [audios, setAudios] = React.useState<ImageUploadType[]>([]);

	const tagWord = content.split('#').pop();
	const isLastWordTag = content.split(' ').pop()?.includes('#');

	const handleContentChange = (value: string) => {
		const lastLetter = value.charAt(value.length - 1);
		const oldValueLastLetter = content.charAt(content.length - 1);
		if (lastLetter === '#' || isLastWordTag) {
			setIsHashtagListShow(true);
		}
		if (
			isLastWordTag &&
			lastLetter === ' ' &&
			oldValueLastLetter !== '#' &&
			isHashtagListShow
		) {
			return;
		} else {
			setContent(value);
		}
	};

	const onEnterKey = (key: string) => {
		if (
			(key === 'Enter' || key === ' ' || key === 'Tab') &&
			tagWord &&
			isHashtagListShow
		) {
			saveTag();
			setIsHashtagListShow(false);
			setContent(`${content} `);
		}
	};

	React.useEffect(() => {
		if (!isLastWordTag && isHashtagListShow) {
			setIsHashtagListShow(false);
		}
	}, [isLastWordTag, isHashtagListShow]);

	const focusContentInput = () => {
		contentRef.current?.focus();
	};

	const onClickTag = (text: string) => {
		const contentArray = content.split('#');
		contentArray[contentArray.length - 1] = text;
		setContent(`${contentArray.join('#')} `);
		setIsHashtagListShow(false);
		focusContentInput();
	};

	const saveTag = async () => {
		if (tagWord && isLastWordTag && user?.token && tags) {
			const lowerCaseTagWord = tagWord.toLowerCase();
			const inTags = tags.find((elem) => elem.text === lowerCaseTagWord);
			console.log({ tagWord, lowerCaseTagWord, inTags });
			if (!inTags) {
				mutateTags(
					{
						tags: [...tags, { id: uuidv4.toString(), text: lowerCaseTagWord }],
					},
					false
				);
				await createTag({ token: user.token, text: lowerCaseTagWord });
				mutateTags();
			}
			onClickTag(lowerCaseTagWord);
		}
	};

	const saveProcess = async (value: string) => {
		if (value) {
			const formattedValue = value.trim();
			const savingProcess = {
				id: '',
				title: '',
			};
			const inProcesses = processes?.find(
				(elem) => elem.title.toLowerCase() === formattedValue
			);
			if (!inProcesses) {
				const newProcess = await createProcess({
					token: user?.token || '',
					title: formattedValue,
				});
				savingProcess.id = newProcess.id;
				savingProcess.title = newProcess.title;
				mutateProcess();
			} else {
				savingProcess.id = inProcesses.id;
				savingProcess.title = inProcesses.title;
			}
			setSelectedProcess(savingProcess);
		}
	};

	const saveIndex = async (value: string) => {
		if (value) {
			const formattedValue = value.toLowerCase().trim();
			const savingIndex = {
				id: '',
				title: '',
			};
			const inIndexes = indexes?.find(
				(elem) => elem.title.toLowerCase() === formattedValue
			);
			if (!inIndexes) {
				const newProcess = await createIndex({
					token: user?.token || '',
					title: formattedValue,
				});
				savingIndex.id = newProcess.id;
				savingIndex.title = newProcess.title;
				mutateIndexes();
			} else {
				savingIndex.id = inIndexes.id;
				savingIndex.title = inIndexes.title;
			}
			setSelectedIndex(savingIndex);
		}
	};

	const removeFile = (index: number, fileType: string) => {
		if (fileType.includes('image')) {
			const newImages = [...images.slice(0, index), ...images.slice(index + 1)];
			setImages(newImages);
		} else if (fileType.includes('video')) {
			const newVideos = [...videos.slice(0, index), ...videos.slice(index + 1)];
			setVideos(newVideos);
		} else if (fileType.includes('audio')) {
			const newAudios = [...audios.slice(0, index), ...audios.slice(index + 1)];
			setAudios(newAudios);
		}
	};

	const addFile = (newFile?: ImageUploadType | null) => {
		if (newFile?.file.type.includes('image')) {
			setImages([...images, newFile]);
		} else if (newFile?.file.type.includes('video')) {
			setVideos([...videos, newFile]);
		} else if (newFile?.file.type.includes('audio')) {
			setAudios([...audios, newFile]);
		}
	};

	const handleMediaUpload = (file: File) => {
		const reader = new FileReader();

		reader.onload = function (e) {
			const uploadedObj = { file, url: e.target?.result as string };
			addFile(uploadedObj);
		};

		reader.readAsDataURL(file); // convert to base64 string
	};

	const onCreateMoment = async () => {
		if (content.trim().length) {
			const selectedTags = content
				.split(' ')
				.filter((word) => word.includes('#'))
				.map((tagWord) => tagWord.split('#').pop());
			const selectedTagsIds = tags
				?.filter((tag) => selectedTags.includes(tag.text))
				.map((tag) => tag.id);
			const tagsToAdd = selectedTagsIds?.map((tagId) => ({ tag_id: tagId }));
			const variables = {
				content,
				isThanks: type === 'thank',
				isFavorite: false,
				emotion: emojiSelected?.key || null,
				tags: tagsToAdd || [],
				images: '',
				videos: '',
				note_voices: '',
				processId: selectedProcess?.id || null,
				indexId: selectedIndex?.id || null,
			};

			mutateMoments((data) => {
				const newMoments = createSRWMoment(data?.moments || [], ({
					...variables,
					id: uuidv4().toString(),
					created_at: moment().format().toString(),
					images: images.map((image) => image.url) || [],
					videos: videos.map((video) => video.url) || [],
					note_voices: audios.map((audio) => audio.url) || [],
				} as unknown) as Moments);
				return {
					moments: newMoments,
				};
			}, false);

			handleCreateMoment(
				variables,
				images.map((image) => image.file) || [],
				videos.map((video) => video.file) || [],
				audios.map((audio) => audio.file) || []
			);

			router.push('/');
		}
	};

	React.useEffect(() => {
		focusContentInput();
	}, []);

	const allMediaFiles = React.useMemo(() => {
		return [...images, ...videos, ...audios];
	}, [images, videos, audios]);

	return (
		<>
			<div
				className={clsx('pt-5 bg-background-nav')}
				style={{
					display: 'grid',
					gridTemplateRows: 'auto auto auto 1fr auto auto',
					minHeight: !height ? '100vh' : `${height}px`,
				}}
			>
				<div className="flex items-center px-5 justify-between mb-6">
					<div
						className="flex items-center cursor-pointer"
						onClick={() => {
							if (content.length) {
								setModalType('cancel');
								show();
							} else {
								router.push('/');
							}
						}}
					>
						<Icon
							src="/images/icons/back-arrow.svg"
							className="mr-4 text-primary"
						/>
						<Title type="2" className="text-primary capitalize">
							Moment
						</Title>
					</div>
					<button
						className="flex items-center justify-center w-28 text-primary"
						onClick={onCreateMoment}
					>
						<Trans>Create</Trans>
					</button>
				</div>

				<div></div>
				{/* <div className="px-5">
					<Subtitle type="2" className="text-secondary flex cursor-pointer">
						<LocationMarkerIcon width="14" className="text-secondary mr-4" />
						<Trans>Add Location</Trans>
					</Subtitle>
				</div> */}

				<ul
					className={clsx(
						'flex gap-3 px-5',
						!!allMediaFiles.length && 'mt-3 mb-4'
					)}
				>
					{allMediaFiles.map((file, index) => (
						<MediaBox
							key={file.url}
							src={file.url}
							isVideo={file.file.type.includes('video')}
							isAudio={file.file.name.includes('audio')}
							onDeleteElement={() => removeFile(index, file.file.type)}
							onClickImage={() => {
								setModalType('media-preview');
								setDefaultPreviewIndex(index);
								show();
							}}
						/>
					))}
				</ul>

				<div className="w-full px-5 h-full">
					<textarea
						ref={contentRef}
						className="border-none pb-7 bg-transparent text-base w-full focus:ring-0 focus:outline-none h-full"
						style={{
							lineHeight: '25.6px',
							letterSpacing: '0.2px',
							resize: 'none',
						}}
						onKeyDown={(e) => onEnterKey(e.key)}
						placeholder="What are you thinking?"
						value={content}
						onChange={(e) => handleContentChange(e.target.value)}
						data-provide="markdown"
					/>
				</div>

				<div className="relative flex flex-col">
					<div
						className="flex border-t-2 border-b-2 border-primary-10 py-4 w-full cursor-pointer"
						onClick={() => {
							setModalType('process');
							show();
						}}
					>
						<div className="px-5 flex justify-between items-center w-full">
							<div className="flex items-center">
								{/* <BookmarkIcon width="16" className="text-secondary mr-3" /> */}
								<Subtitle type="2" className="text-secondary">
									{!selectedProcess ? (
										<Trans>Add to Process</Trans>
									) : (
										<Trans>Process</Trans>
									)}
								</Subtitle>
							</div>
							<div className="flex items-center">
								{selectedProcess ? (
									<Subtitle type="3" className="text-primary-60 mr-5">
										{selectedProcess.title}
									</Subtitle>
								) : null}
								<ChevronRightIcon width="16" className="text-primary-40" />
							</div>
						</div>
					</div>

					<div className="flex justify-between items-center w-full px-5 py-4">
						<div className="grid grid-flow-col gap-8">
							<div
								className="cursor-pointer"
								onClick={() => {
									setModalType('index');
									show();
								}}
							>
								<BookmarkIcon
									width="18"
									className={clsx(
										'text-secondary',
										selectedIndex ? 'fill-current' : 'stroke-current'
									)}
								/>
							</div>
							<div>
								<input
									type="file"
									id="upload-image"
									name="upload-image"
									accept="image/*;video/mp4;capture=camera"
									className="hidden"
									onChange={(event) =>
										event.target.files && event.target.files[0]
											? handleMediaUpload(event.target.files[0])
											: null
									}
								/>
								<label htmlFor="upload-image">
									<PhotographIcon
										width="18"
										className="text-secondary cursor-pointer"
									/>
								</label>
							</div>
							<div
								onClick={() => {
									setModalType('voice');
									show();
								}}
							>
								<MicrophoneIcon
									width="18"
									className="text-secondary cursor-pointer"
								/>
							</div>
							<div
								onClick={() => {
									setContent((prev) => {
										const lastLetter = prev.charAt(prev.length - 1);
										if (lastLetter === ' ') {
											return `${prev}#`;
										}
										return `${prev} #`;
									});
									setIsHashtagListShow(true);
									contentRef.current?.focus();
								}}
								className="cursor-pointer"
							>
								<HashtagIcon
									width="18"
									className="fill-current text-secondary"
								/>
							</div>
							<Icon
								className="text-secondary cursor-pointer"
								src="/images/icons/add-emoji.svg"
								width="18px"
								height="18px"
								fill
							/>
						</div>
						<BodyText className="text-primary-40">
							{moment().format('LT')}
						</BodyText>
					</div>
					{isHashtagListShow && (
						<ul
							className="absolute -top-6 bg-background-nav right-0 left-0 z-10 flex border border-primary-40 flex-col overflow-y-scroll hide-scroll-bar"
							style={{ height: 'calc(100% + 24px)' }}
						>
							{!!tags &&
								tags
									.filter((tag) =>
										tag.text.includes(content.split('#').pop() || '')
									)
									.map((tag) => (
										<li
											key={tag.id}
											className="py-2 px-5 flex justify-between"
											onClick={() => onClickTag(tag.text)}
										>
											<BodyText className="text-secondary">{tag.text}</BodyText>
											<BodyText className="text-secondary">
												{tag.tag_moments_aggregate?.aggregate.count}
											</BodyText>
										</li>
									))}
						</ul>
					)}
				</div>
			</div>
			<Modal isShow={isShow}>
				{modalType === 'cancel' && (
					<Alert
						title={t`Cancel moment`}
						description={t`You will miss all the progress for this moment`}
						successText={t`Keep`}
						cancelText={t`Delete`}
						onClickSuccess={hide}
						closeAlert={() => {
							hide();
							router.push('/');
						}}
					/>
				)}
				{modalType === 'voice' && (
					<div
						className="flex flex-col items-center bg-background rounded-lg py-6"
						style={{ width: '70vw', maxWidth: '500px' }}
					>
						<VoiceRecorder
							saveAudio={() => null}
							hideModal={(value: ImageUploadType | null) => {
								addFile(value);
								hide();
							}}
						/>
					</div>
				)}
				{modalType === 'media-preview' && (
					<FullMedia
						hideModal={hide}
						images={images.map((e) => e.url)}
						audios={audios.map((e) => e.url)}
						videos={videos.map((e) => e.url)}
						defaultIndex={defaultPreviewIndex}
					/>
				)}
				{modalType === 'process' && (
					<CreateItem
						title="Add Process"
						placeholder="Insert a process..."
						descriptionTitle="Give a purpose to your moments"
						descriptionBody="A process is used to keep record of your journal to achieve anything great you want in life and make them easy to be found so you can see your progress in your goals."
						createText="Create new process"
						activeText="All Active Processes"
						onCreateNewOne={async (value) => {
							saveProcess(value);
							hide();
						}}
						onClickElem={(value) => {
							setSelectedProcess(value);
							hide();
						}}
						onClose={hide}
						data={processes || []}
					/>
				)}
				{modalType === 'index' && (
					<CreateItem
						title="Add to Index"
						placeholder="Insert a index..."
						descriptionTitle="Give a purpose to your moments"
						descriptionBody="A process is used to keep record of your journal to achieve anything great you want in life and make them easy to be found so you can see your progress in your goals."
						createText="Create new Index"
						activeText="All Active Indexes"
						onClickElem={(value) => {
							setSelectedIndex(value);
							hide();
						}}
						onCreateNewOne={async (value) => {
							saveIndex(value);
							hide();
						}}
						onClose={hide}
						data={indexes || []}
					/>
				)}
			</Modal>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const isAuth = context.req.cookies?.auth;

	if (!isAuth) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default Create;
