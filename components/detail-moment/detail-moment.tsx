import * as React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import styles from './detail-moment.module.scss';
import { useCurrentMoment } from 'hooks';
import { useModal } from 'hooks/use-modal';
import { Icon } from 'components/icon';
import { FullMedia } from 'components/full-media';
import { Alert } from 'components/alert';
import { useMoments } from 'hooks/api';
import {
	deleteMoment,
	editMomentContent,
	updateFavoriteMoment,
	updateSWRFavoriteMoment,
} from 'gql/mutations';
import { useUser } from 'hooks/user/useUser';
import { t, Trans } from '@lingui/macro';
import { Badge } from 'components/badge';
import { Button } from 'components/button';

interface DetailMomentProps {
	closeBottomSheet: () => void;
}

export const DetailMoment: React.FC<DetailMomentProps> = ({
	closeBottomSheet,
}) => {
	const { currentMoment } = useCurrentMoment();
	const { mutate } = useMoments();
	const user = useUser();
	const contentRef = React.useRef<HTMLTextAreaElement>(null);
	const [editableContent, setEditableContent] = React.useState(
		currentMoment?.content || ''
	);
	const [isFavorite, setIsFavorite] = React.useState(
		!!currentMoment?.is_favorite
	);
	React.useEffect(() => {
		setIsFavorite(!!currentMoment?.is_favorite);
	}, [currentMoment]);
	const {
		show: showMediaModal,
		hide: hideMediaModal,
		isShow: isMediaModalVisible,
		Modal: MediaModal,
	} = useModal();
	const {
		show: showDeleteModal,
		hide: hideDeleteModal,
		isShow: isDeleteModalVisible,
		Modal: DeleteModal,
	} = useModal();
	const {
		show: showEditModal,
		hide: hideEditModal,
		isShow: isEditModalVisible,
		Modal: EditModal,
	} = useModal();

	const handleUpdateFavoriteMoment = async (): Promise<void> => {
		const token = user?.token || '';
		setIsFavorite(!isFavorite);
		if (currentMoment) {
			mutate((data) => {
				const updatedMoments = updateSWRFavoriteMoment(
					data?.moments || [],
					currentMoment
				);
				return {
					moments: updatedMoments,
				};
			}, false);
			await updateFavoriteMoment({
				token,
				variables: {
					id: currentMoment?.id || '',
					isFavorite: !currentMoment?.is_favorite,
				},
			});
			mutate();
		}
	};

	const handleDeleteMoment = async (): Promise<void> => {
		const token = user?.token || '';
		if (currentMoment) {
			mutate((data) => {
				const updatedMoments = data?.moments.filter(
					(moment) => moment.id !== currentMoment.id
				);
				return {
					moments: updatedMoments || data?.moments || [],
				};
			}, false);
			hideDeleteModal();
			closeBottomSheet();
			await deleteMoment({ token, variables: { id: currentMoment.id } });
			mutate();
		}
	};

	const handleEditMoment = async (): Promise<void> => {
		const token = user?.token || '';
		if (currentMoment) {
			mutate((data) => {
				const updatedMoments = data?.moments.map((moment) => {
					if (moment.id !== currentMoment.id) {
						return moment;
					} else {
						return {
							...moment,
							content: editableContent,
						};
					}
				});
				return {
					moments: updatedMoments || data?.moments || [],
				};
			}, false);
			hideEditModal();
			await editMomentContent({
				token,
				variables: { id: currentMoment.id, content: editableContent },
			});
			mutate();
		}
	};

	React.useEffect(() => {
		if (isEditModalVisible) {
			contentRef.current?.focus();
		}
	}, [isEditModalVisible]);

	React.useEffect(() => {
		if (currentMoment?.content) {
			setEditableContent(currentMoment.content);
		}
	}, [currentMoment]);

	return (
		<>
			<div className={clsx('flex flex-col items-center p-5 pt-3 w-full')}>
				<div
					className={clsx('rounded-lg, mb-8 px-6 h-2 bg-primary-20 rounded-lg')}
				/>
				{!!currentMoment?.images?.length && (
					<div className="relative mb-5 w-full rounded-1.2lg overflow-hidden">
						<Image
							width={355}
							height={222}
							src={currentMoment.images[0]}
							alt="moment-image"
							objectFit="cover"
							layout="responsive"
						/>
						<Badge onClick={showMediaModal}>Expand</Badge>
					</div>
				)}
				{!!currentMoment?.videos?.length && !currentMoment?.images?.length && (
					<div className={styles.mediaContainer}>
						<video
							className={styles.image}
							src={currentMoment.videos[0]}
							autoPlay={false}
						/>
						<div className={styles.playIconContainer}>
							<img src="/images/examples/play.png" alt="play icon" />
						</div>
						<Badge onClick={showMediaModal}>Expand</Badge>
					</div>
				)}
				<div className="flex items-center justify-between mb-6 w-full">
					<div className="flex gap-3 items-center">
						<p className="text-primary-light font-sans text-lg font-semibold">
							{moment(currentMoment?.created_at).format('Do, MMM')}
						</p>
						<p className="text-secondary font-sans text-sm font-semibold">
							{moment(currentMoment?.created_at).format('LT')}
						</p>
					</div>
					<div className="z-30 flex gap-5 items-center">
						<div
							onTouchStart={(e) => {
								e.stopPropagation();
								handleUpdateFavoriteMoment();
							}}
							onClick={(e) => {
								e.stopPropagation();
								handleUpdateFavoriteMoment();
							}}
						>
							<Icon
								pointer
								src="/images/icons/star.svg"
								fill={isFavorite}
								className="text-primary"
							/>
						</div>
						<div
							onTouchStart={(e) => {
								e.stopPropagation();
								showEditModal();
							}}
							onClick={() => {
								showEditModal();
							}}
						>
							<Icon
								src="/images/icons/edit.svg"
								pointer
								className="text-primary"
							/>
						</div>
						<div
							onTouchStart={(e) => {
								e.stopPropagation();
								showDeleteModal();
							}}
							onClick={() => {
								showDeleteModal();
							}}
						>
							<Icon
								src="/images/icons/delete.svg"
								pointer
								className="text-primary"
							/>
						</div>
					</div>
				</div>
				{currentMoment?.note_voices?.length && (
					<div className="flex flex-col mb-4 w-full">
						<audio
							id="audio-player"
							src={currentMoment.note_voices[0]}
							controls
							className="w-full"
						/>
					</div>
				)}
				<div className="w-full text-left text-primary-60 font-serif text-lg moments-md">
					<ReactMarkdown>
						{editableContent || currentMoment?.content || ''}
					</ReactMarkdown>
				</div>
			</div>
			<MediaModal isShow={isMediaModalVisible}>
				<FullMedia
					hideModal={hideMediaModal}
					images={currentMoment?.images || []}
					videos={currentMoment?.videos || []}
					audios={currentMoment?.note_voices || []}
				/>
			</MediaModal>
			<DeleteModal isShow={isDeleteModalVisible}>
				<Alert
					title={t`Are you sure?`}
					description={t`You won’t be able to recover this moment later`}
					cancelText={t`Cancel`}
					successText={t`Delete`}
					closeAlert={hideDeleteModal}
					onClickSuccess={handleDeleteMoment}
				/>
			</DeleteModal>
			<EditModal isShow={isEditModalVisible}>
				<div
					className="absolute top-0 right-0 left-0 overflow-y-auto grid content-start p-5 pt-8 w-full h-full bg-background-input"
					style={{ gridTemplateRows: '1fr 150px' }}
				>
					<div className={clsx('relative mb-6 w-full top-0 right-0 left-0')}>
						<textarea
							ref={contentRef}
							value={editableContent}
							onChange={(e) => {
								setEditableContent(e.target.value);
							}}
							className={clsx(
								{ 'pt-12': !editableContent },
								'p-6 w-full h-full text-primary text-base tracking-widest bg-background-input transition-colors duration-200',
								'focus:bg-offwhite focus:outline-none focus:ring-primary focus:ring-2'
							)}
							data-provide="markdown"
						></textarea>
						{!editableContent && (
							<p className="absolute left-6 top-5 text-primary-60">
								<Trans>What am I thinking?</Trans>
							</p>
						)}
					</div>
					<div className="grid gap-3">
						<Button onClick={handleEditMoment} isFill>
							<Trans>Edit</Trans>
						</Button>
						<Button isFill={false} onClick={hideEditModal}>
							<Trans>Cancel</Trans>
						</Button>
					</div>
				</div>
			</EditModal>
		</>
	);
};
