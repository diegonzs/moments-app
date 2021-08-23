export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
	{ [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	_text: any;
	timestamptz: any;
	uuid: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
	_eq?: Maybe<Scalars['Boolean']>;
	_gt?: Maybe<Scalars['Boolean']>;
	_gte?: Maybe<Scalars['Boolean']>;
	_in?: Maybe<Array<Scalars['Boolean']>>;
	_is_null?: Maybe<Scalars['Boolean']>;
	_lt?: Maybe<Scalars['Boolean']>;
	_lte?: Maybe<Scalars['Boolean']>;
	_neq?: Maybe<Scalars['Boolean']>;
	_nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
	_eq?: Maybe<Scalars['String']>;
	_gt?: Maybe<Scalars['String']>;
	_gte?: Maybe<Scalars['String']>;
	_ilike?: Maybe<Scalars['String']>;
	_in?: Maybe<Array<Scalars['String']>>;
	_is_null?: Maybe<Scalars['Boolean']>;
	_like?: Maybe<Scalars['String']>;
	_lt?: Maybe<Scalars['String']>;
	_lte?: Maybe<Scalars['String']>;
	_neq?: Maybe<Scalars['String']>;
	_nilike?: Maybe<Scalars['String']>;
	_nin?: Maybe<Array<Scalars['String']>>;
	_nlike?: Maybe<Scalars['String']>;
	_nsimilar?: Maybe<Scalars['String']>;
	_similar?: Maybe<Scalars['String']>;
};

/** expression to compare columns of type _text. All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
	_eq?: Maybe<Scalars['_text']>;
	_gt?: Maybe<Scalars['_text']>;
	_gte?: Maybe<Scalars['_text']>;
	_in?: Maybe<Array<Scalars['_text']>>;
	_is_null?: Maybe<Scalars['Boolean']>;
	_lt?: Maybe<Scalars['_text']>;
	_lte?: Maybe<Scalars['_text']>;
	_neq?: Maybe<Scalars['_text']>;
	_nin?: Maybe<Array<Scalars['_text']>>;
};

/** columns and relationships of "indexes" */
export type Indexes = {
	__typename?: 'indexes';
	created_at: Scalars['timestamptz'];
	id: Scalars['uuid'];
	/** An array relationship */
	moments: Array<Moments>;
	/** An aggregated array relationship */
	moments_aggregate: Moments_Aggregate;
	title: Scalars['String'];
	updated_at: Scalars['timestamptz'];
	user_id: Scalars['String'];
};

/** columns and relationships of "indexes" */
export type IndexesMomentsArgs = {
	distinct_on?: Maybe<Array<Moments_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moments_Order_By>>;
	where?: Maybe<Moments_Bool_Exp>;
};

/** columns and relationships of "indexes" */
export type IndexesMoments_AggregateArgs = {
	distinct_on?: Maybe<Array<Moments_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moments_Order_By>>;
	where?: Maybe<Moments_Bool_Exp>;
};

/** aggregated selection of "indexes" */
export type Indexes_Aggregate = {
	__typename?: 'indexes_aggregate';
	aggregate?: Maybe<Indexes_Aggregate_Fields>;
	nodes: Array<Indexes>;
};

/** aggregate fields of "indexes" */
export type Indexes_Aggregate_Fields = {
	__typename?: 'indexes_aggregate_fields';
	count?: Maybe<Scalars['Int']>;
	max?: Maybe<Indexes_Max_Fields>;
	min?: Maybe<Indexes_Min_Fields>;
};

/** aggregate fields of "indexes" */
export type Indexes_Aggregate_FieldsCountArgs = {
	columns?: Maybe<Array<Indexes_Select_Column>>;
	distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "indexes" */
export type Indexes_Aggregate_Order_By = {
	count?: Maybe<Order_By>;
	max?: Maybe<Indexes_Max_Order_By>;
	min?: Maybe<Indexes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "indexes" */
export type Indexes_Arr_Rel_Insert_Input = {
	data: Array<Indexes_Insert_Input>;
	on_conflict?: Maybe<Indexes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "indexes". All fields are combined with a logical 'AND'. */
export type Indexes_Bool_Exp = {
	_and?: Maybe<Array<Maybe<Indexes_Bool_Exp>>>;
	_not?: Maybe<Indexes_Bool_Exp>;
	_or?: Maybe<Array<Maybe<Indexes_Bool_Exp>>>;
	created_at?: Maybe<Timestamptz_Comparison_Exp>;
	id?: Maybe<Uuid_Comparison_Exp>;
	moments?: Maybe<Moments_Bool_Exp>;
	title?: Maybe<String_Comparison_Exp>;
	updated_at?: Maybe<Timestamptz_Comparison_Exp>;
	user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "indexes" */
export enum Indexes_Constraint {
	/** unique or primary key constraint */
	IndexesPkey = 'indexes_pkey',
}

/** input type for inserting data into table "indexes" */
export type Indexes_Insert_Input = {
	created_at?: Maybe<Scalars['timestamptz']>;
	id?: Maybe<Scalars['uuid']>;
	moments?: Maybe<Moments_Arr_Rel_Insert_Input>;
	title?: Maybe<Scalars['String']>;
	updated_at?: Maybe<Scalars['timestamptz']>;
	user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Indexes_Max_Fields = {
	__typename?: 'indexes_max_fields';
	created_at?: Maybe<Scalars['timestamptz']>;
	id?: Maybe<Scalars['uuid']>;
	title?: Maybe<Scalars['String']>;
	updated_at?: Maybe<Scalars['timestamptz']>;
	user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "indexes" */
export type Indexes_Max_Order_By = {
	created_at?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	title?: Maybe<Order_By>;
	updated_at?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Indexes_Min_Fields = {
	__typename?: 'indexes_min_fields';
	created_at?: Maybe<Scalars['timestamptz']>;
	id?: Maybe<Scalars['uuid']>;
	title?: Maybe<Scalars['String']>;
	updated_at?: Maybe<Scalars['timestamptz']>;
	user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "indexes" */
export type Indexes_Min_Order_By = {
	created_at?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	title?: Maybe<Order_By>;
	updated_at?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "indexes" */
export type Indexes_Mutation_Response = {
	__typename?: 'indexes_mutation_response';
	/** number of affected rows by the mutation */
	affected_rows: Scalars['Int'];
	/** data of the affected rows by the mutation */
	returning: Array<Indexes>;
};

/** input type for inserting object relation for remote table "indexes" */
export type Indexes_Obj_Rel_Insert_Input = {
	data: Indexes_Insert_Input;
	on_conflict?: Maybe<Indexes_On_Conflict>;
};

/** on conflict condition type for table "indexes" */
export type Indexes_On_Conflict = {
	constraint: Indexes_Constraint;
	update_columns: Array<Indexes_Update_Column>;
	where?: Maybe<Indexes_Bool_Exp>;
};

/** ordering options when selecting data from "indexes" */
export type Indexes_Order_By = {
	created_at?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	moments_aggregate?: Maybe<Moments_Aggregate_Order_By>;
	title?: Maybe<Order_By>;
	updated_at?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "indexes" */
export type Indexes_Pk_Columns_Input = {
	id: Scalars['uuid'];
};

/** select columns of table "indexes" */
export enum Indexes_Select_Column {
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Id = 'id',
	/** column name */
	Title = 'title',
	/** column name */
	UpdatedAt = 'updated_at',
	/** column name */
	UserId = 'user_id',
}

/** input type for updating data in table "indexes" */
export type Indexes_Set_Input = {
	created_at?: Maybe<Scalars['timestamptz']>;
	id?: Maybe<Scalars['uuid']>;
	title?: Maybe<Scalars['String']>;
	updated_at?: Maybe<Scalars['timestamptz']>;
	user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "indexes" */
export enum Indexes_Update_Column {
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Id = 'id',
	/** column name */
	Title = 'title',
	/** column name */
	UpdatedAt = 'updated_at',
	/** column name */
	UserId = 'user_id',
}

/** columns and relationships of "moment_tag" */
export type Moment_Tag = {
	__typename?: 'moment_tag';
	id: Scalars['uuid'];
	/** An object relationship */
	moment: Moments;
	moment_id: Scalars['uuid'];
	/** An object relationship */
	tag: Tags;
	tag_id: Scalars['uuid'];
};

/** aggregated selection of "moment_tag" */
export type Moment_Tag_Aggregate = {
	__typename?: 'moment_tag_aggregate';
	aggregate?: Maybe<Moment_Tag_Aggregate_Fields>;
	nodes: Array<Moment_Tag>;
};

/** aggregate fields of "moment_tag" */
export type Moment_Tag_Aggregate_Fields = {
	__typename?: 'moment_tag_aggregate_fields';
	count?: Maybe<Scalars['Int']>;
	max?: Maybe<Moment_Tag_Max_Fields>;
	min?: Maybe<Moment_Tag_Min_Fields>;
};

/** aggregate fields of "moment_tag" */
export type Moment_Tag_Aggregate_FieldsCountArgs = {
	columns?: Maybe<Array<Moment_Tag_Select_Column>>;
	distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "moment_tag" */
export type Moment_Tag_Aggregate_Order_By = {
	count?: Maybe<Order_By>;
	max?: Maybe<Moment_Tag_Max_Order_By>;
	min?: Maybe<Moment_Tag_Min_Order_By>;
};

/** input type for inserting array relation for remote table "moment_tag" */
export type Moment_Tag_Arr_Rel_Insert_Input = {
	data: Array<Moment_Tag_Insert_Input>;
	on_conflict?: Maybe<Moment_Tag_On_Conflict>;
};

/** Boolean expression to filter rows from the table "moment_tag". All fields are combined with a logical 'AND'. */
export type Moment_Tag_Bool_Exp = {
	_and?: Maybe<Array<Maybe<Moment_Tag_Bool_Exp>>>;
	_not?: Maybe<Moment_Tag_Bool_Exp>;
	_or?: Maybe<Array<Maybe<Moment_Tag_Bool_Exp>>>;
	id?: Maybe<Uuid_Comparison_Exp>;
	moment?: Maybe<Moments_Bool_Exp>;
	moment_id?: Maybe<Uuid_Comparison_Exp>;
	tag?: Maybe<Tags_Bool_Exp>;
	tag_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "moment_tag" */
export enum Moment_Tag_Constraint {
	/** unique or primary key constraint */
	MomentTagIdKey = 'moment_tag_id_key',
	/** unique or primary key constraint */
	MomentTagPkey = 'moment_tag_pkey',
}

/** input type for inserting data into table "moment_tag" */
export type Moment_Tag_Insert_Input = {
	id?: Maybe<Scalars['uuid']>;
	moment?: Maybe<Moments_Obj_Rel_Insert_Input>;
	moment_id?: Maybe<Scalars['uuid']>;
	tag?: Maybe<Tags_Obj_Rel_Insert_Input>;
	tag_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Moment_Tag_Max_Fields = {
	__typename?: 'moment_tag_max_fields';
	id?: Maybe<Scalars['uuid']>;
	moment_id?: Maybe<Scalars['uuid']>;
	tag_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "moment_tag" */
export type Moment_Tag_Max_Order_By = {
	id?: Maybe<Order_By>;
	moment_id?: Maybe<Order_By>;
	tag_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Moment_Tag_Min_Fields = {
	__typename?: 'moment_tag_min_fields';
	id?: Maybe<Scalars['uuid']>;
	moment_id?: Maybe<Scalars['uuid']>;
	tag_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "moment_tag" */
export type Moment_Tag_Min_Order_By = {
	id?: Maybe<Order_By>;
	moment_id?: Maybe<Order_By>;
	tag_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "moment_tag" */
export type Moment_Tag_Mutation_Response = {
	__typename?: 'moment_tag_mutation_response';
	/** number of affected rows by the mutation */
	affected_rows: Scalars['Int'];
	/** data of the affected rows by the mutation */
	returning: Array<Moment_Tag>;
};

/** input type for inserting object relation for remote table "moment_tag" */
export type Moment_Tag_Obj_Rel_Insert_Input = {
	data: Moment_Tag_Insert_Input;
	on_conflict?: Maybe<Moment_Tag_On_Conflict>;
};

/** on conflict condition type for table "moment_tag" */
export type Moment_Tag_On_Conflict = {
	constraint: Moment_Tag_Constraint;
	update_columns: Array<Moment_Tag_Update_Column>;
	where?: Maybe<Moment_Tag_Bool_Exp>;
};

/** ordering options when selecting data from "moment_tag" */
export type Moment_Tag_Order_By = {
	id?: Maybe<Order_By>;
	moment?: Maybe<Moments_Order_By>;
	moment_id?: Maybe<Order_By>;
	tag?: Maybe<Tags_Order_By>;
	tag_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "moment_tag" */
export type Moment_Tag_Pk_Columns_Input = {
	id: Scalars['uuid'];
	moment_id: Scalars['uuid'];
	tag_id: Scalars['uuid'];
};

/** select columns of table "moment_tag" */
export enum Moment_Tag_Select_Column {
	/** column name */
	Id = 'id',
	/** column name */
	MomentId = 'moment_id',
	/** column name */
	TagId = 'tag_id',
}

/** input type for updating data in table "moment_tag" */
export type Moment_Tag_Set_Input = {
	id?: Maybe<Scalars['uuid']>;
	moment_id?: Maybe<Scalars['uuid']>;
	tag_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "moment_tag" */
export enum Moment_Tag_Update_Column {
	/** column name */
	Id = 'id',
	/** column name */
	MomentId = 'moment_id',
	/** column name */
	TagId = 'tag_id',
}

/** columns and relationships of "moments" */
export type Moments = {
	__typename?: 'moments';
	content: Scalars['String'];
	created_at: Scalars['timestamptz'];
	emotion?: Maybe<Scalars['String']>;
	id: Scalars['uuid'];
	images?: Maybe<Scalars['_text']>;
	/** An object relationship */
	index?: Maybe<Indexes>;
	index_id?: Maybe<Scalars['uuid']>;
	is_favorite?: Maybe<Scalars['Boolean']>;
	is_thanks: Scalars['Boolean'];
	/** An array relationship */
	moment_tags: Array<Moment_Tag>;
	/** An aggregated array relationship */
	moment_tags_aggregate: Moment_Tag_Aggregate;
	note_voice?: Maybe<Scalars['String']>;
	note_voices?: Maybe<Scalars['_text']>;
	/** An object relationship */
	process?: Maybe<Processes>;
	process_id?: Maybe<Scalars['uuid']>;
	updated_at: Scalars['timestamptz'];
	/** An object relationship */
	user: Users;
	user_id: Scalars['String'];
	videos?: Maybe<Scalars['_text']>;
};

/** columns and relationships of "moments" */
export type MomentsMoment_TagsArgs = {
	distinct_on?: Maybe<Array<Moment_Tag_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moment_Tag_Order_By>>;
	where?: Maybe<Moment_Tag_Bool_Exp>;
};

/** columns and relationships of "moments" */
export type MomentsMoment_Tags_AggregateArgs = {
	distinct_on?: Maybe<Array<Moment_Tag_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moment_Tag_Order_By>>;
	where?: Maybe<Moment_Tag_Bool_Exp>;
};

/** aggregated selection of "moments" */
export type Moments_Aggregate = {
	__typename?: 'moments_aggregate';
	aggregate?: Maybe<Moments_Aggregate_Fields>;
	nodes: Array<Moments>;
};

/** aggregate fields of "moments" */
export type Moments_Aggregate_Fields = {
	__typename?: 'moments_aggregate_fields';
	count?: Maybe<Scalars['Int']>;
	max?: Maybe<Moments_Max_Fields>;
	min?: Maybe<Moments_Min_Fields>;
};

/** aggregate fields of "moments" */
export type Moments_Aggregate_FieldsCountArgs = {
	columns?: Maybe<Array<Moments_Select_Column>>;
	distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "moments" */
export type Moments_Aggregate_Order_By = {
	count?: Maybe<Order_By>;
	max?: Maybe<Moments_Max_Order_By>;
	min?: Maybe<Moments_Min_Order_By>;
};

/** input type for inserting array relation for remote table "moments" */
export type Moments_Arr_Rel_Insert_Input = {
	data: Array<Moments_Insert_Input>;
	on_conflict?: Maybe<Moments_On_Conflict>;
};

/** Boolean expression to filter rows from the table "moments". All fields are combined with a logical 'AND'. */
export type Moments_Bool_Exp = {
	_and?: Maybe<Array<Maybe<Moments_Bool_Exp>>>;
	_not?: Maybe<Moments_Bool_Exp>;
	_or?: Maybe<Array<Maybe<Moments_Bool_Exp>>>;
	content?: Maybe<String_Comparison_Exp>;
	created_at?: Maybe<Timestamptz_Comparison_Exp>;
	emotion?: Maybe<String_Comparison_Exp>;
	id?: Maybe<Uuid_Comparison_Exp>;
	images?: Maybe<_Text_Comparison_Exp>;
	index?: Maybe<Indexes_Bool_Exp>;
	index_id?: Maybe<Uuid_Comparison_Exp>;
	is_favorite?: Maybe<Boolean_Comparison_Exp>;
	is_thanks?: Maybe<Boolean_Comparison_Exp>;
	moment_tags?: Maybe<Moment_Tag_Bool_Exp>;
	note_voice?: Maybe<String_Comparison_Exp>;
	note_voices?: Maybe<_Text_Comparison_Exp>;
	process?: Maybe<Processes_Bool_Exp>;
	process_id?: Maybe<Uuid_Comparison_Exp>;
	updated_at?: Maybe<Timestamptz_Comparison_Exp>;
	user?: Maybe<Users_Bool_Exp>;
	user_id?: Maybe<String_Comparison_Exp>;
	videos?: Maybe<_Text_Comparison_Exp>;
};

/** unique or primary key constraints on table "moments" */
export enum Moments_Constraint {
	/** unique or primary key constraint */
	MomentsPkey = 'moments_pkey',
}

/** input type for inserting data into table "moments" */
export type Moments_Insert_Input = {
	content?: Maybe<Scalars['String']>;
	created_at?: Maybe<Scalars['timestamptz']>;
	emotion?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['uuid']>;
	images?: Maybe<Scalars['_text']>;
	index?: Maybe<Indexes_Obj_Rel_Insert_Input>;
	index_id?: Maybe<Scalars['uuid']>;
	is_favorite?: Maybe<Scalars['Boolean']>;
	is_thanks?: Maybe<Scalars['Boolean']>;
	moment_tags?: Maybe<Moment_Tag_Arr_Rel_Insert_Input>;
	note_voice?: Maybe<Scalars['String']>;
	note_voices?: Maybe<Scalars['_text']>;
	process?: Maybe<Processes_Obj_Rel_Insert_Input>;
	process_id?: Maybe<Scalars['uuid']>;
	updated_at?: Maybe<Scalars['timestamptz']>;
	user?: Maybe<Users_Obj_Rel_Insert_Input>;
	user_id?: Maybe<Scalars['String']>;
	videos?: Maybe<Scalars['_text']>;
};

/** aggregate max on columns */
export type Moments_Max_Fields = {
	__typename?: 'moments_max_fields';
	content?: Maybe<Scalars['String']>;
	created_at?: Maybe<Scalars['timestamptz']>;
	emotion?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['uuid']>;
	index_id?: Maybe<Scalars['uuid']>;
	note_voice?: Maybe<Scalars['String']>;
	process_id?: Maybe<Scalars['uuid']>;
	updated_at?: Maybe<Scalars['timestamptz']>;
	user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "moments" */
export type Moments_Max_Order_By = {
	content?: Maybe<Order_By>;
	created_at?: Maybe<Order_By>;
	emotion?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	index_id?: Maybe<Order_By>;
	note_voice?: Maybe<Order_By>;
	process_id?: Maybe<Order_By>;
	updated_at?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Moments_Min_Fields = {
	__typename?: 'moments_min_fields';
	content?: Maybe<Scalars['String']>;
	created_at?: Maybe<Scalars['timestamptz']>;
	emotion?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['uuid']>;
	index_id?: Maybe<Scalars['uuid']>;
	note_voice?: Maybe<Scalars['String']>;
	process_id?: Maybe<Scalars['uuid']>;
	updated_at?: Maybe<Scalars['timestamptz']>;
	user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "moments" */
export type Moments_Min_Order_By = {
	content?: Maybe<Order_By>;
	created_at?: Maybe<Order_By>;
	emotion?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	index_id?: Maybe<Order_By>;
	note_voice?: Maybe<Order_By>;
	process_id?: Maybe<Order_By>;
	updated_at?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "moments" */
export type Moments_Mutation_Response = {
	__typename?: 'moments_mutation_response';
	/** number of affected rows by the mutation */
	affected_rows: Scalars['Int'];
	/** data of the affected rows by the mutation */
	returning: Array<Moments>;
};

/** input type for inserting object relation for remote table "moments" */
export type Moments_Obj_Rel_Insert_Input = {
	data: Moments_Insert_Input;
	on_conflict?: Maybe<Moments_On_Conflict>;
};

/** on conflict condition type for table "moments" */
export type Moments_On_Conflict = {
	constraint: Moments_Constraint;
	update_columns: Array<Moments_Update_Column>;
	where?: Maybe<Moments_Bool_Exp>;
};

/** ordering options when selecting data from "moments" */
export type Moments_Order_By = {
	content?: Maybe<Order_By>;
	created_at?: Maybe<Order_By>;
	emotion?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	images?: Maybe<Order_By>;
	index?: Maybe<Indexes_Order_By>;
	index_id?: Maybe<Order_By>;
	is_favorite?: Maybe<Order_By>;
	is_thanks?: Maybe<Order_By>;
	moment_tags_aggregate?: Maybe<Moment_Tag_Aggregate_Order_By>;
	note_voice?: Maybe<Order_By>;
	note_voices?: Maybe<Order_By>;
	process?: Maybe<Processes_Order_By>;
	process_id?: Maybe<Order_By>;
	updated_at?: Maybe<Order_By>;
	user?: Maybe<Users_Order_By>;
	user_id?: Maybe<Order_By>;
	videos?: Maybe<Order_By>;
};

/** primary key columns input for table: "moments" */
export type Moments_Pk_Columns_Input = {
	id: Scalars['uuid'];
};

/** select columns of table "moments" */
export enum Moments_Select_Column {
	/** column name */
	Content = 'content',
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Emotion = 'emotion',
	/** column name */
	Id = 'id',
	/** column name */
	Images = 'images',
	/** column name */
	IndexId = 'index_id',
	/** column name */
	IsFavorite = 'is_favorite',
	/** column name */
	IsThanks = 'is_thanks',
	/** column name */
	NoteVoice = 'note_voice',
	/** column name */
	NoteVoices = 'note_voices',
	/** column name */
	ProcessId = 'process_id',
	/** column name */
	UpdatedAt = 'updated_at',
	/** column name */
	UserId = 'user_id',
	/** column name */
	Videos = 'videos',
}

/** input type for updating data in table "moments" */
export type Moments_Set_Input = {
	content?: Maybe<Scalars['String']>;
	created_at?: Maybe<Scalars['timestamptz']>;
	emotion?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['uuid']>;
	images?: Maybe<Scalars['_text']>;
	index_id?: Maybe<Scalars['uuid']>;
	is_favorite?: Maybe<Scalars['Boolean']>;
	is_thanks?: Maybe<Scalars['Boolean']>;
	note_voice?: Maybe<Scalars['String']>;
	note_voices?: Maybe<Scalars['_text']>;
	process_id?: Maybe<Scalars['uuid']>;
	updated_at?: Maybe<Scalars['timestamptz']>;
	user_id?: Maybe<Scalars['String']>;
	videos?: Maybe<Scalars['_text']>;
};

/** update columns of table "moments" */
export enum Moments_Update_Column {
	/** column name */
	Content = 'content',
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Emotion = 'emotion',
	/** column name */
	Id = 'id',
	/** column name */
	Images = 'images',
	/** column name */
	IndexId = 'index_id',
	/** column name */
	IsFavorite = 'is_favorite',
	/** column name */
	IsThanks = 'is_thanks',
	/** column name */
	NoteVoice = 'note_voice',
	/** column name */
	NoteVoices = 'note_voices',
	/** column name */
	ProcessId = 'process_id',
	/** column name */
	UpdatedAt = 'updated_at',
	/** column name */
	UserId = 'user_id',
	/** column name */
	Videos = 'videos',
}

/** mutation root */
export type Mutation_Root = {
	__typename?: 'mutation_root';
	/** delete data from the table: "indexes" */
	delete_indexes?: Maybe<Indexes_Mutation_Response>;
	/** delete single row from the table: "indexes" */
	delete_indexes_by_pk?: Maybe<Indexes>;
	/** delete data from the table: "moment_tag" */
	delete_moment_tag?: Maybe<Moment_Tag_Mutation_Response>;
	/** delete single row from the table: "moment_tag" */
	delete_moment_tag_by_pk?: Maybe<Moment_Tag>;
	/** delete data from the table: "moments" */
	delete_moments?: Maybe<Moments_Mutation_Response>;
	/** delete single row from the table: "moments" */
	delete_moments_by_pk?: Maybe<Moments>;
	/** delete data from the table: "pro_emails" */
	delete_pro_emails?: Maybe<Pro_Emails_Mutation_Response>;
	/** delete single row from the table: "pro_emails" */
	delete_pro_emails_by_pk?: Maybe<Pro_Emails>;
	/** delete data from the table: "processes" */
	delete_processes?: Maybe<Processes_Mutation_Response>;
	/** delete single row from the table: "processes" */
	delete_processes_by_pk?: Maybe<Processes>;
	/** delete data from the table: "tags" */
	delete_tags?: Maybe<Tags_Mutation_Response>;
	/** delete single row from the table: "tags" */
	delete_tags_by_pk?: Maybe<Tags>;
	/** delete data from the table: "users" */
	delete_users?: Maybe<Users_Mutation_Response>;
	/** delete single row from the table: "users" */
	delete_users_by_pk?: Maybe<Users>;
	/** insert data into the table: "indexes" */
	insert_indexes?: Maybe<Indexes_Mutation_Response>;
	/** insert a single row into the table: "indexes" */
	insert_indexes_one?: Maybe<Indexes>;
	/** insert data into the table: "moment_tag" */
	insert_moment_tag?: Maybe<Moment_Tag_Mutation_Response>;
	/** insert a single row into the table: "moment_tag" */
	insert_moment_tag_one?: Maybe<Moment_Tag>;
	/** insert data into the table: "moments" */
	insert_moments?: Maybe<Moments_Mutation_Response>;
	/** insert a single row into the table: "moments" */
	insert_moments_one?: Maybe<Moments>;
	/** insert data into the table: "pro_emails" */
	insert_pro_emails?: Maybe<Pro_Emails_Mutation_Response>;
	/** insert a single row into the table: "pro_emails" */
	insert_pro_emails_one?: Maybe<Pro_Emails>;
	/** insert data into the table: "processes" */
	insert_processes?: Maybe<Processes_Mutation_Response>;
	/** insert a single row into the table: "processes" */
	insert_processes_one?: Maybe<Processes>;
	/** insert data into the table: "tags" */
	insert_tags?: Maybe<Tags_Mutation_Response>;
	/** insert a single row into the table: "tags" */
	insert_tags_one?: Maybe<Tags>;
	/** insert data into the table: "users" */
	insert_users?: Maybe<Users_Mutation_Response>;
	/** insert a single row into the table: "users" */
	insert_users_one?: Maybe<Users>;
	/** update data of the table: "indexes" */
	update_indexes?: Maybe<Indexes_Mutation_Response>;
	/** update single row of the table: "indexes" */
	update_indexes_by_pk?: Maybe<Indexes>;
	/** update data of the table: "moment_tag" */
	update_moment_tag?: Maybe<Moment_Tag_Mutation_Response>;
	/** update single row of the table: "moment_tag" */
	update_moment_tag_by_pk?: Maybe<Moment_Tag>;
	/** update data of the table: "moments" */
	update_moments?: Maybe<Moments_Mutation_Response>;
	/** update single row of the table: "moments" */
	update_moments_by_pk?: Maybe<Moments>;
	/** update data of the table: "pro_emails" */
	update_pro_emails?: Maybe<Pro_Emails_Mutation_Response>;
	/** update single row of the table: "pro_emails" */
	update_pro_emails_by_pk?: Maybe<Pro_Emails>;
	/** update data of the table: "processes" */
	update_processes?: Maybe<Processes_Mutation_Response>;
	/** update single row of the table: "processes" */
	update_processes_by_pk?: Maybe<Processes>;
	/** update data of the table: "tags" */
	update_tags?: Maybe<Tags_Mutation_Response>;
	/** update single row of the table: "tags" */
	update_tags_by_pk?: Maybe<Tags>;
	/** update data of the table: "users" */
	update_users?: Maybe<Users_Mutation_Response>;
	/** update single row of the table: "users" */
	update_users_by_pk?: Maybe<Users>;
};

/** mutation root */
export type Mutation_RootDelete_IndexesArgs = {
	where: Indexes_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Indexes_By_PkArgs = {
	id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_Moment_TagArgs = {
	where: Moment_Tag_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Moment_Tag_By_PkArgs = {
	id: Scalars['uuid'];
	moment_id: Scalars['uuid'];
	tag_id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_MomentsArgs = {
	where: Moments_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Moments_By_PkArgs = {
	id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_Pro_EmailsArgs = {
	where: Pro_Emails_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Pro_Emails_By_PkArgs = {
	id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_ProcessesArgs = {
	where: Processes_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Processes_By_PkArgs = {
	id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_TagsArgs = {
	where: Tags_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Tags_By_PkArgs = {
	id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
	where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
	id: Scalars['String'];
};

/** mutation root */
export type Mutation_RootInsert_IndexesArgs = {
	objects: Array<Indexes_Insert_Input>;
	on_conflict?: Maybe<Indexes_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Indexes_OneArgs = {
	object: Indexes_Insert_Input;
	on_conflict?: Maybe<Indexes_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Moment_TagArgs = {
	objects: Array<Moment_Tag_Insert_Input>;
	on_conflict?: Maybe<Moment_Tag_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Moment_Tag_OneArgs = {
	object: Moment_Tag_Insert_Input;
	on_conflict?: Maybe<Moment_Tag_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_MomentsArgs = {
	objects: Array<Moments_Insert_Input>;
	on_conflict?: Maybe<Moments_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Moments_OneArgs = {
	object: Moments_Insert_Input;
	on_conflict?: Maybe<Moments_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Pro_EmailsArgs = {
	objects: Array<Pro_Emails_Insert_Input>;
	on_conflict?: Maybe<Pro_Emails_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Pro_Emails_OneArgs = {
	object: Pro_Emails_Insert_Input;
	on_conflict?: Maybe<Pro_Emails_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ProcessesArgs = {
	objects: Array<Processes_Insert_Input>;
	on_conflict?: Maybe<Processes_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Processes_OneArgs = {
	object: Processes_Insert_Input;
	on_conflict?: Maybe<Processes_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_TagsArgs = {
	objects: Array<Tags_Insert_Input>;
	on_conflict?: Maybe<Tags_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Tags_OneArgs = {
	object: Tags_Insert_Input;
	on_conflict?: Maybe<Tags_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
	objects: Array<Users_Insert_Input>;
	on_conflict?: Maybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
	object: Users_Insert_Input;
	on_conflict?: Maybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_IndexesArgs = {
	_set?: Maybe<Indexes_Set_Input>;
	where: Indexes_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Indexes_By_PkArgs = {
	_set?: Maybe<Indexes_Set_Input>;
	pk_columns: Indexes_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Moment_TagArgs = {
	_set?: Maybe<Moment_Tag_Set_Input>;
	where: Moment_Tag_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Moment_Tag_By_PkArgs = {
	_set?: Maybe<Moment_Tag_Set_Input>;
	pk_columns: Moment_Tag_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_MomentsArgs = {
	_set?: Maybe<Moments_Set_Input>;
	where: Moments_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Moments_By_PkArgs = {
	_set?: Maybe<Moments_Set_Input>;
	pk_columns: Moments_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Pro_EmailsArgs = {
	_set?: Maybe<Pro_Emails_Set_Input>;
	where: Pro_Emails_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Pro_Emails_By_PkArgs = {
	_set?: Maybe<Pro_Emails_Set_Input>;
	pk_columns: Pro_Emails_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_ProcessesArgs = {
	_set?: Maybe<Processes_Set_Input>;
	where: Processes_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Processes_By_PkArgs = {
	_set?: Maybe<Processes_Set_Input>;
	pk_columns: Processes_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_TagsArgs = {
	_set?: Maybe<Tags_Set_Input>;
	where: Tags_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Tags_By_PkArgs = {
	_set?: Maybe<Tags_Set_Input>;
	pk_columns: Tags_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
	_set?: Maybe<Users_Set_Input>;
	where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
	_set?: Maybe<Users_Set_Input>;
	pk_columns: Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
	/** in the ascending order, nulls last */
	Asc = 'asc',
	/** in the ascending order, nulls first */
	AscNullsFirst = 'asc_nulls_first',
	/** in the ascending order, nulls last */
	AscNullsLast = 'asc_nulls_last',
	/** in the descending order, nulls first */
	Desc = 'desc',
	/** in the descending order, nulls first */
	DescNullsFirst = 'desc_nulls_first',
	/** in the descending order, nulls last */
	DescNullsLast = 'desc_nulls_last',
}

/** columns and relationships of "pro_emails" */
export type Pro_Emails = {
	__typename?: 'pro_emails';
	created_at: Scalars['timestamptz'];
	email: Scalars['String'];
	id: Scalars['uuid'];
	user_id?: Maybe<Scalars['String']>;
};

/** aggregated selection of "pro_emails" */
export type Pro_Emails_Aggregate = {
	__typename?: 'pro_emails_aggregate';
	aggregate?: Maybe<Pro_Emails_Aggregate_Fields>;
	nodes: Array<Pro_Emails>;
};

/** aggregate fields of "pro_emails" */
export type Pro_Emails_Aggregate_Fields = {
	__typename?: 'pro_emails_aggregate_fields';
	count?: Maybe<Scalars['Int']>;
	max?: Maybe<Pro_Emails_Max_Fields>;
	min?: Maybe<Pro_Emails_Min_Fields>;
};

/** aggregate fields of "pro_emails" */
export type Pro_Emails_Aggregate_FieldsCountArgs = {
	columns?: Maybe<Array<Pro_Emails_Select_Column>>;
	distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "pro_emails" */
export type Pro_Emails_Aggregate_Order_By = {
	count?: Maybe<Order_By>;
	max?: Maybe<Pro_Emails_Max_Order_By>;
	min?: Maybe<Pro_Emails_Min_Order_By>;
};

/** input type for inserting array relation for remote table "pro_emails" */
export type Pro_Emails_Arr_Rel_Insert_Input = {
	data: Array<Pro_Emails_Insert_Input>;
	on_conflict?: Maybe<Pro_Emails_On_Conflict>;
};

/** Boolean expression to filter rows from the table "pro_emails". All fields are combined with a logical 'AND'. */
export type Pro_Emails_Bool_Exp = {
	_and?: Maybe<Array<Maybe<Pro_Emails_Bool_Exp>>>;
	_not?: Maybe<Pro_Emails_Bool_Exp>;
	_or?: Maybe<Array<Maybe<Pro_Emails_Bool_Exp>>>;
	created_at?: Maybe<Timestamptz_Comparison_Exp>;
	email?: Maybe<String_Comparison_Exp>;
	id?: Maybe<Uuid_Comparison_Exp>;
	user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "pro_emails" */
export enum Pro_Emails_Constraint {
	/** unique or primary key constraint */
	ProEmailsEmailKey = 'pro_emails_email_key',
	/** unique or primary key constraint */
	ProEmailsPkey = 'pro_emails_pkey',
	/** unique or primary key constraint */
	ProEmailsUserIdKey = 'pro_emails_user_id_key',
}

/** input type for inserting data into table "pro_emails" */
export type Pro_Emails_Insert_Input = {
	created_at?: Maybe<Scalars['timestamptz']>;
	email?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['uuid']>;
	user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Pro_Emails_Max_Fields = {
	__typename?: 'pro_emails_max_fields';
	created_at?: Maybe<Scalars['timestamptz']>;
	email?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['uuid']>;
	user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "pro_emails" */
export type Pro_Emails_Max_Order_By = {
	created_at?: Maybe<Order_By>;
	email?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Pro_Emails_Min_Fields = {
	__typename?: 'pro_emails_min_fields';
	created_at?: Maybe<Scalars['timestamptz']>;
	email?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['uuid']>;
	user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "pro_emails" */
export type Pro_Emails_Min_Order_By = {
	created_at?: Maybe<Order_By>;
	email?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "pro_emails" */
export type Pro_Emails_Mutation_Response = {
	__typename?: 'pro_emails_mutation_response';
	/** number of affected rows by the mutation */
	affected_rows: Scalars['Int'];
	/** data of the affected rows by the mutation */
	returning: Array<Pro_Emails>;
};

/** input type for inserting object relation for remote table "pro_emails" */
export type Pro_Emails_Obj_Rel_Insert_Input = {
	data: Pro_Emails_Insert_Input;
	on_conflict?: Maybe<Pro_Emails_On_Conflict>;
};

/** on conflict condition type for table "pro_emails" */
export type Pro_Emails_On_Conflict = {
	constraint: Pro_Emails_Constraint;
	update_columns: Array<Pro_Emails_Update_Column>;
	where?: Maybe<Pro_Emails_Bool_Exp>;
};

/** ordering options when selecting data from "pro_emails" */
export type Pro_Emails_Order_By = {
	created_at?: Maybe<Order_By>;
	email?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "pro_emails" */
export type Pro_Emails_Pk_Columns_Input = {
	id: Scalars['uuid'];
};

/** select columns of table "pro_emails" */
export enum Pro_Emails_Select_Column {
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Email = 'email',
	/** column name */
	Id = 'id',
	/** column name */
	UserId = 'user_id',
}

/** input type for updating data in table "pro_emails" */
export type Pro_Emails_Set_Input = {
	created_at?: Maybe<Scalars['timestamptz']>;
	email?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['uuid']>;
	user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "pro_emails" */
export enum Pro_Emails_Update_Column {
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Email = 'email',
	/** column name */
	Id = 'id',
	/** column name */
	UserId = 'user_id',
}

/** columns and relationships of "processes" */
export type Processes = {
	__typename?: 'processes';
	created_at: Scalars['timestamptz'];
	id: Scalars['uuid'];
	is_active?: Maybe<Scalars['Boolean']>;
	is_completed: Scalars['Boolean'];
	/** An array relationship */
	moments: Array<Moments>;
	/** An aggregated array relationship */
	moments_aggregate: Moments_Aggregate;
	title: Scalars['String'];
	updated_at: Scalars['timestamptz'];
	user_id: Scalars['String'];
};

/** columns and relationships of "processes" */
export type ProcessesMomentsArgs = {
	distinct_on?: Maybe<Array<Moments_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moments_Order_By>>;
	where?: Maybe<Moments_Bool_Exp>;
};

/** columns and relationships of "processes" */
export type ProcessesMoments_AggregateArgs = {
	distinct_on?: Maybe<Array<Moments_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moments_Order_By>>;
	where?: Maybe<Moments_Bool_Exp>;
};

/** aggregated selection of "processes" */
export type Processes_Aggregate = {
	__typename?: 'processes_aggregate';
	aggregate?: Maybe<Processes_Aggregate_Fields>;
	nodes: Array<Processes>;
};

/** aggregate fields of "processes" */
export type Processes_Aggregate_Fields = {
	__typename?: 'processes_aggregate_fields';
	count?: Maybe<Scalars['Int']>;
	max?: Maybe<Processes_Max_Fields>;
	min?: Maybe<Processes_Min_Fields>;
};

/** aggregate fields of "processes" */
export type Processes_Aggregate_FieldsCountArgs = {
	columns?: Maybe<Array<Processes_Select_Column>>;
	distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "processes" */
export type Processes_Aggregate_Order_By = {
	count?: Maybe<Order_By>;
	max?: Maybe<Processes_Max_Order_By>;
	min?: Maybe<Processes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "processes" */
export type Processes_Arr_Rel_Insert_Input = {
	data: Array<Processes_Insert_Input>;
	on_conflict?: Maybe<Processes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "processes". All fields are combined with a logical 'AND'. */
export type Processes_Bool_Exp = {
	_and?: Maybe<Array<Maybe<Processes_Bool_Exp>>>;
	_not?: Maybe<Processes_Bool_Exp>;
	_or?: Maybe<Array<Maybe<Processes_Bool_Exp>>>;
	created_at?: Maybe<Timestamptz_Comparison_Exp>;
	id?: Maybe<Uuid_Comparison_Exp>;
	is_active?: Maybe<Boolean_Comparison_Exp>;
	is_completed?: Maybe<Boolean_Comparison_Exp>;
	moments?: Maybe<Moments_Bool_Exp>;
	title?: Maybe<String_Comparison_Exp>;
	updated_at?: Maybe<Timestamptz_Comparison_Exp>;
	user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "processes" */
export enum Processes_Constraint {
	/** unique or primary key constraint */
	ProcessesPkey = 'processes_pkey',
}

/** input type for inserting data into table "processes" */
export type Processes_Insert_Input = {
	created_at?: Maybe<Scalars['timestamptz']>;
	id?: Maybe<Scalars['uuid']>;
	is_active?: Maybe<Scalars['Boolean']>;
	is_completed?: Maybe<Scalars['Boolean']>;
	moments?: Maybe<Moments_Arr_Rel_Insert_Input>;
	title?: Maybe<Scalars['String']>;
	updated_at?: Maybe<Scalars['timestamptz']>;
	user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Processes_Max_Fields = {
	__typename?: 'processes_max_fields';
	created_at?: Maybe<Scalars['timestamptz']>;
	id?: Maybe<Scalars['uuid']>;
	title?: Maybe<Scalars['String']>;
	updated_at?: Maybe<Scalars['timestamptz']>;
	user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "processes" */
export type Processes_Max_Order_By = {
	created_at?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	title?: Maybe<Order_By>;
	updated_at?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Processes_Min_Fields = {
	__typename?: 'processes_min_fields';
	created_at?: Maybe<Scalars['timestamptz']>;
	id?: Maybe<Scalars['uuid']>;
	title?: Maybe<Scalars['String']>;
	updated_at?: Maybe<Scalars['timestamptz']>;
	user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "processes" */
export type Processes_Min_Order_By = {
	created_at?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	title?: Maybe<Order_By>;
	updated_at?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "processes" */
export type Processes_Mutation_Response = {
	__typename?: 'processes_mutation_response';
	/** number of affected rows by the mutation */
	affected_rows: Scalars['Int'];
	/** data of the affected rows by the mutation */
	returning: Array<Processes>;
};

/** input type for inserting object relation for remote table "processes" */
export type Processes_Obj_Rel_Insert_Input = {
	data: Processes_Insert_Input;
	on_conflict?: Maybe<Processes_On_Conflict>;
};

/** on conflict condition type for table "processes" */
export type Processes_On_Conflict = {
	constraint: Processes_Constraint;
	update_columns: Array<Processes_Update_Column>;
	where?: Maybe<Processes_Bool_Exp>;
};

/** ordering options when selecting data from "processes" */
export type Processes_Order_By = {
	created_at?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	is_active?: Maybe<Order_By>;
	is_completed?: Maybe<Order_By>;
	moments_aggregate?: Maybe<Moments_Aggregate_Order_By>;
	title?: Maybe<Order_By>;
	updated_at?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "processes" */
export type Processes_Pk_Columns_Input = {
	id: Scalars['uuid'];
};

/** select columns of table "processes" */
export enum Processes_Select_Column {
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Id = 'id',
	/** column name */
	IsActive = 'is_active',
	/** column name */
	IsCompleted = 'is_completed',
	/** column name */
	Title = 'title',
	/** column name */
	UpdatedAt = 'updated_at',
	/** column name */
	UserId = 'user_id',
}

/** input type for updating data in table "processes" */
export type Processes_Set_Input = {
	created_at?: Maybe<Scalars['timestamptz']>;
	id?: Maybe<Scalars['uuid']>;
	is_active?: Maybe<Scalars['Boolean']>;
	is_completed?: Maybe<Scalars['Boolean']>;
	title?: Maybe<Scalars['String']>;
	updated_at?: Maybe<Scalars['timestamptz']>;
	user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "processes" */
export enum Processes_Update_Column {
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Id = 'id',
	/** column name */
	IsActive = 'is_active',
	/** column name */
	IsCompleted = 'is_completed',
	/** column name */
	Title = 'title',
	/** column name */
	UpdatedAt = 'updated_at',
	/** column name */
	UserId = 'user_id',
}

/** query root */
export type Query_Root = {
	__typename?: 'query_root';
	/** fetch data from the table: "indexes" */
	indexes: Array<Indexes>;
	/** fetch aggregated fields from the table: "indexes" */
	indexes_aggregate: Indexes_Aggregate;
	/** fetch data from the table: "indexes" using primary key columns */
	indexes_by_pk?: Maybe<Indexes>;
	/** fetch data from the table: "moment_tag" */
	moment_tag: Array<Moment_Tag>;
	/** fetch aggregated fields from the table: "moment_tag" */
	moment_tag_aggregate: Moment_Tag_Aggregate;
	/** fetch data from the table: "moment_tag" using primary key columns */
	moment_tag_by_pk?: Maybe<Moment_Tag>;
	/** fetch data from the table: "moments" */
	moments: Array<Moments>;
	/** fetch aggregated fields from the table: "moments" */
	moments_aggregate: Moments_Aggregate;
	/** fetch data from the table: "moments" using primary key columns */
	moments_by_pk?: Maybe<Moments>;
	/** fetch data from the table: "pro_emails" */
	pro_emails: Array<Pro_Emails>;
	/** fetch aggregated fields from the table: "pro_emails" */
	pro_emails_aggregate: Pro_Emails_Aggregate;
	/** fetch data from the table: "pro_emails" using primary key columns */
	pro_emails_by_pk?: Maybe<Pro_Emails>;
	/** fetch data from the table: "processes" */
	processes: Array<Processes>;
	/** fetch aggregated fields from the table: "processes" */
	processes_aggregate: Processes_Aggregate;
	/** fetch data from the table: "processes" using primary key columns */
	processes_by_pk?: Maybe<Processes>;
	/** fetch data from the table: "tags" */
	tags: Array<Tags>;
	/** fetch aggregated fields from the table: "tags" */
	tags_aggregate: Tags_Aggregate;
	/** fetch data from the table: "tags" using primary key columns */
	tags_by_pk?: Maybe<Tags>;
	/** fetch data from the table: "users" */
	users: Array<Users>;
	/** fetch aggregated fields from the table: "users" */
	users_aggregate: Users_Aggregate;
	/** fetch data from the table: "users" using primary key columns */
	users_by_pk?: Maybe<Users>;
};

/** query root */
export type Query_RootIndexesArgs = {
	distinct_on?: Maybe<Array<Indexes_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Indexes_Order_By>>;
	where?: Maybe<Indexes_Bool_Exp>;
};

/** query root */
export type Query_RootIndexes_AggregateArgs = {
	distinct_on?: Maybe<Array<Indexes_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Indexes_Order_By>>;
	where?: Maybe<Indexes_Bool_Exp>;
};

/** query root */
export type Query_RootIndexes_By_PkArgs = {
	id: Scalars['uuid'];
};

/** query root */
export type Query_RootMoment_TagArgs = {
	distinct_on?: Maybe<Array<Moment_Tag_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moment_Tag_Order_By>>;
	where?: Maybe<Moment_Tag_Bool_Exp>;
};

/** query root */
export type Query_RootMoment_Tag_AggregateArgs = {
	distinct_on?: Maybe<Array<Moment_Tag_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moment_Tag_Order_By>>;
	where?: Maybe<Moment_Tag_Bool_Exp>;
};

/** query root */
export type Query_RootMoment_Tag_By_PkArgs = {
	id: Scalars['uuid'];
	moment_id: Scalars['uuid'];
	tag_id: Scalars['uuid'];
};

/** query root */
export type Query_RootMomentsArgs = {
	distinct_on?: Maybe<Array<Moments_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moments_Order_By>>;
	where?: Maybe<Moments_Bool_Exp>;
};

/** query root */
export type Query_RootMoments_AggregateArgs = {
	distinct_on?: Maybe<Array<Moments_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moments_Order_By>>;
	where?: Maybe<Moments_Bool_Exp>;
};

/** query root */
export type Query_RootMoments_By_PkArgs = {
	id: Scalars['uuid'];
};

/** query root */
export type Query_RootPro_EmailsArgs = {
	distinct_on?: Maybe<Array<Pro_Emails_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Pro_Emails_Order_By>>;
	where?: Maybe<Pro_Emails_Bool_Exp>;
};

/** query root */
export type Query_RootPro_Emails_AggregateArgs = {
	distinct_on?: Maybe<Array<Pro_Emails_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Pro_Emails_Order_By>>;
	where?: Maybe<Pro_Emails_Bool_Exp>;
};

/** query root */
export type Query_RootPro_Emails_By_PkArgs = {
	id: Scalars['uuid'];
};

/** query root */
export type Query_RootProcessesArgs = {
	distinct_on?: Maybe<Array<Processes_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Processes_Order_By>>;
	where?: Maybe<Processes_Bool_Exp>;
};

/** query root */
export type Query_RootProcesses_AggregateArgs = {
	distinct_on?: Maybe<Array<Processes_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Processes_Order_By>>;
	where?: Maybe<Processes_Bool_Exp>;
};

/** query root */
export type Query_RootProcesses_By_PkArgs = {
	id: Scalars['uuid'];
};

/** query root */
export type Query_RootTagsArgs = {
	distinct_on?: Maybe<Array<Tags_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Tags_Order_By>>;
	where?: Maybe<Tags_Bool_Exp>;
};

/** query root */
export type Query_RootTags_AggregateArgs = {
	distinct_on?: Maybe<Array<Tags_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Tags_Order_By>>;
	where?: Maybe<Tags_Bool_Exp>;
};

/** query root */
export type Query_RootTags_By_PkArgs = {
	id: Scalars['uuid'];
};

/** query root */
export type Query_RootUsersArgs = {
	distinct_on?: Maybe<Array<Users_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Users_Order_By>>;
	where?: Maybe<Users_Bool_Exp>;
};

/** query root */
export type Query_RootUsers_AggregateArgs = {
	distinct_on?: Maybe<Array<Users_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Users_Order_By>>;
	where?: Maybe<Users_Bool_Exp>;
};

/** query root */
export type Query_RootUsers_By_PkArgs = {
	id: Scalars['String'];
};

/** subscription root */
export type Subscription_Root = {
	__typename?: 'subscription_root';
	/** fetch data from the table: "indexes" */
	indexes: Array<Indexes>;
	/** fetch aggregated fields from the table: "indexes" */
	indexes_aggregate: Indexes_Aggregate;
	/** fetch data from the table: "indexes" using primary key columns */
	indexes_by_pk?: Maybe<Indexes>;
	/** fetch data from the table: "moment_tag" */
	moment_tag: Array<Moment_Tag>;
	/** fetch aggregated fields from the table: "moment_tag" */
	moment_tag_aggregate: Moment_Tag_Aggregate;
	/** fetch data from the table: "moment_tag" using primary key columns */
	moment_tag_by_pk?: Maybe<Moment_Tag>;
	/** fetch data from the table: "moments" */
	moments: Array<Moments>;
	/** fetch aggregated fields from the table: "moments" */
	moments_aggregate: Moments_Aggregate;
	/** fetch data from the table: "moments" using primary key columns */
	moments_by_pk?: Maybe<Moments>;
	/** fetch data from the table: "pro_emails" */
	pro_emails: Array<Pro_Emails>;
	/** fetch aggregated fields from the table: "pro_emails" */
	pro_emails_aggregate: Pro_Emails_Aggregate;
	/** fetch data from the table: "pro_emails" using primary key columns */
	pro_emails_by_pk?: Maybe<Pro_Emails>;
	/** fetch data from the table: "processes" */
	processes: Array<Processes>;
	/** fetch aggregated fields from the table: "processes" */
	processes_aggregate: Processes_Aggregate;
	/** fetch data from the table: "processes" using primary key columns */
	processes_by_pk?: Maybe<Processes>;
	/** fetch data from the table: "tags" */
	tags: Array<Tags>;
	/** fetch aggregated fields from the table: "tags" */
	tags_aggregate: Tags_Aggregate;
	/** fetch data from the table: "tags" using primary key columns */
	tags_by_pk?: Maybe<Tags>;
	/** fetch data from the table: "users" */
	users: Array<Users>;
	/** fetch aggregated fields from the table: "users" */
	users_aggregate: Users_Aggregate;
	/** fetch data from the table: "users" using primary key columns */
	users_by_pk?: Maybe<Users>;
};

/** subscription root */
export type Subscription_RootIndexesArgs = {
	distinct_on?: Maybe<Array<Indexes_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Indexes_Order_By>>;
	where?: Maybe<Indexes_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootIndexes_AggregateArgs = {
	distinct_on?: Maybe<Array<Indexes_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Indexes_Order_By>>;
	where?: Maybe<Indexes_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootIndexes_By_PkArgs = {
	id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootMoment_TagArgs = {
	distinct_on?: Maybe<Array<Moment_Tag_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moment_Tag_Order_By>>;
	where?: Maybe<Moment_Tag_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootMoment_Tag_AggregateArgs = {
	distinct_on?: Maybe<Array<Moment_Tag_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moment_Tag_Order_By>>;
	where?: Maybe<Moment_Tag_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootMoment_Tag_By_PkArgs = {
	id: Scalars['uuid'];
	moment_id: Scalars['uuid'];
	tag_id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootMomentsArgs = {
	distinct_on?: Maybe<Array<Moments_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moments_Order_By>>;
	where?: Maybe<Moments_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootMoments_AggregateArgs = {
	distinct_on?: Maybe<Array<Moments_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moments_Order_By>>;
	where?: Maybe<Moments_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootMoments_By_PkArgs = {
	id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootPro_EmailsArgs = {
	distinct_on?: Maybe<Array<Pro_Emails_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Pro_Emails_Order_By>>;
	where?: Maybe<Pro_Emails_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPro_Emails_AggregateArgs = {
	distinct_on?: Maybe<Array<Pro_Emails_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Pro_Emails_Order_By>>;
	where?: Maybe<Pro_Emails_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPro_Emails_By_PkArgs = {
	id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootProcessesArgs = {
	distinct_on?: Maybe<Array<Processes_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Processes_Order_By>>;
	where?: Maybe<Processes_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProcesses_AggregateArgs = {
	distinct_on?: Maybe<Array<Processes_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Processes_Order_By>>;
	where?: Maybe<Processes_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProcesses_By_PkArgs = {
	id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootTagsArgs = {
	distinct_on?: Maybe<Array<Tags_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Tags_Order_By>>;
	where?: Maybe<Tags_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootTags_AggregateArgs = {
	distinct_on?: Maybe<Array<Tags_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Tags_Order_By>>;
	where?: Maybe<Tags_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootTags_By_PkArgs = {
	id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootUsersArgs = {
	distinct_on?: Maybe<Array<Users_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Users_Order_By>>;
	where?: Maybe<Users_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
	distinct_on?: Maybe<Array<Users_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Users_Order_By>>;
	where?: Maybe<Users_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
	id: Scalars['String'];
};

/** columns and relationships of "tags" */
export type Tags = {
	__typename?: 'tags';
	created_at: Scalars['timestamptz'];
	id: Scalars['uuid'];
	/** An array relationship */
	tag_moments: Array<Moment_Tag>;
	/** An aggregated array relationship */
	tag_moments_aggregate: Moment_Tag_Aggregate;
	text: Scalars['String'];
	user_id: Scalars['String'];
};

/** columns and relationships of "tags" */
export type TagsTag_MomentsArgs = {
	distinct_on?: Maybe<Array<Moment_Tag_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moment_Tag_Order_By>>;
	where?: Maybe<Moment_Tag_Bool_Exp>;
};

/** columns and relationships of "tags" */
export type TagsTag_Moments_AggregateArgs = {
	distinct_on?: Maybe<Array<Moment_Tag_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moment_Tag_Order_By>>;
	where?: Maybe<Moment_Tag_Bool_Exp>;
};

/** aggregated selection of "tags" */
export type Tags_Aggregate = {
	__typename?: 'tags_aggregate';
	aggregate?: Maybe<Tags_Aggregate_Fields>;
	nodes: Array<Tags>;
};

/** aggregate fields of "tags" */
export type Tags_Aggregate_Fields = {
	__typename?: 'tags_aggregate_fields';
	count?: Maybe<Scalars['Int']>;
	max?: Maybe<Tags_Max_Fields>;
	min?: Maybe<Tags_Min_Fields>;
};

/** aggregate fields of "tags" */
export type Tags_Aggregate_FieldsCountArgs = {
	columns?: Maybe<Array<Tags_Select_Column>>;
	distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "tags" */
export type Tags_Aggregate_Order_By = {
	count?: Maybe<Order_By>;
	max?: Maybe<Tags_Max_Order_By>;
	min?: Maybe<Tags_Min_Order_By>;
};

/** input type for inserting array relation for remote table "tags" */
export type Tags_Arr_Rel_Insert_Input = {
	data: Array<Tags_Insert_Input>;
	on_conflict?: Maybe<Tags_On_Conflict>;
};

/** Boolean expression to filter rows from the table "tags". All fields are combined with a logical 'AND'. */
export type Tags_Bool_Exp = {
	_and?: Maybe<Array<Maybe<Tags_Bool_Exp>>>;
	_not?: Maybe<Tags_Bool_Exp>;
	_or?: Maybe<Array<Maybe<Tags_Bool_Exp>>>;
	created_at?: Maybe<Timestamptz_Comparison_Exp>;
	id?: Maybe<Uuid_Comparison_Exp>;
	tag_moments?: Maybe<Moment_Tag_Bool_Exp>;
	text?: Maybe<String_Comparison_Exp>;
	user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "tags" */
export enum Tags_Constraint {
	/** unique or primary key constraint */
	TagsPkey = 'tags_pkey',
}

/** input type for inserting data into table "tags" */
export type Tags_Insert_Input = {
	created_at?: Maybe<Scalars['timestamptz']>;
	id?: Maybe<Scalars['uuid']>;
	tag_moments?: Maybe<Moment_Tag_Arr_Rel_Insert_Input>;
	text?: Maybe<Scalars['String']>;
	user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Tags_Max_Fields = {
	__typename?: 'tags_max_fields';
	created_at?: Maybe<Scalars['timestamptz']>;
	id?: Maybe<Scalars['uuid']>;
	text?: Maybe<Scalars['String']>;
	user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "tags" */
export type Tags_Max_Order_By = {
	created_at?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	text?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Tags_Min_Fields = {
	__typename?: 'tags_min_fields';
	created_at?: Maybe<Scalars['timestamptz']>;
	id?: Maybe<Scalars['uuid']>;
	text?: Maybe<Scalars['String']>;
	user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "tags" */
export type Tags_Min_Order_By = {
	created_at?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	text?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "tags" */
export type Tags_Mutation_Response = {
	__typename?: 'tags_mutation_response';
	/** number of affected rows by the mutation */
	affected_rows: Scalars['Int'];
	/** data of the affected rows by the mutation */
	returning: Array<Tags>;
};

/** input type for inserting object relation for remote table "tags" */
export type Tags_Obj_Rel_Insert_Input = {
	data: Tags_Insert_Input;
	on_conflict?: Maybe<Tags_On_Conflict>;
};

/** on conflict condition type for table "tags" */
export type Tags_On_Conflict = {
	constraint: Tags_Constraint;
	update_columns: Array<Tags_Update_Column>;
	where?: Maybe<Tags_Bool_Exp>;
};

/** ordering options when selecting data from "tags" */
export type Tags_Order_By = {
	created_at?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	tag_moments_aggregate?: Maybe<Moment_Tag_Aggregate_Order_By>;
	text?: Maybe<Order_By>;
	user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "tags" */
export type Tags_Pk_Columns_Input = {
	id: Scalars['uuid'];
};

/** select columns of table "tags" */
export enum Tags_Select_Column {
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Id = 'id',
	/** column name */
	Text = 'text',
	/** column name */
	UserId = 'user_id',
}

/** input type for updating data in table "tags" */
export type Tags_Set_Input = {
	created_at?: Maybe<Scalars['timestamptz']>;
	id?: Maybe<Scalars['uuid']>;
	text?: Maybe<Scalars['String']>;
	user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "tags" */
export enum Tags_Update_Column {
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Id = 'id',
	/** column name */
	Text = 'text',
	/** column name */
	UserId = 'user_id',
}

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
	_eq?: Maybe<Scalars['timestamptz']>;
	_gt?: Maybe<Scalars['timestamptz']>;
	_gte?: Maybe<Scalars['timestamptz']>;
	_in?: Maybe<Array<Scalars['timestamptz']>>;
	_is_null?: Maybe<Scalars['Boolean']>;
	_lt?: Maybe<Scalars['timestamptz']>;
	_lte?: Maybe<Scalars['timestamptz']>;
	_neq?: Maybe<Scalars['timestamptz']>;
	_nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
	__typename?: 'users';
	created_at: Scalars['timestamptz'];
	email: Scalars['String'];
	first_name?: Maybe<Scalars['String']>;
	id: Scalars['String'];
	last_name?: Maybe<Scalars['String']>;
	/** An array relationship */
	moments: Array<Moments>;
	/** An aggregated array relationship */
	moments_aggregate: Moments_Aggregate;
	/** An object relationship */
	pro_email?: Maybe<Pro_Emails>;
};

/** columns and relationships of "users" */
export type UsersMomentsArgs = {
	distinct_on?: Maybe<Array<Moments_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moments_Order_By>>;
	where?: Maybe<Moments_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersMoments_AggregateArgs = {
	distinct_on?: Maybe<Array<Moments_Select_Column>>;
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	order_by?: Maybe<Array<Moments_Order_By>>;
	where?: Maybe<Moments_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
	__typename?: 'users_aggregate';
	aggregate?: Maybe<Users_Aggregate_Fields>;
	nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
	__typename?: 'users_aggregate_fields';
	count?: Maybe<Scalars['Int']>;
	max?: Maybe<Users_Max_Fields>;
	min?: Maybe<Users_Min_Fields>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
	columns?: Maybe<Array<Users_Select_Column>>;
	distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
	count?: Maybe<Order_By>;
	max?: Maybe<Users_Max_Order_By>;
	min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
	data: Array<Users_Insert_Input>;
	on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
	_and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
	_not?: Maybe<Users_Bool_Exp>;
	_or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
	created_at?: Maybe<Timestamptz_Comparison_Exp>;
	email?: Maybe<String_Comparison_Exp>;
	first_name?: Maybe<String_Comparison_Exp>;
	id?: Maybe<String_Comparison_Exp>;
	last_name?: Maybe<String_Comparison_Exp>;
	moments?: Maybe<Moments_Bool_Exp>;
	pro_email?: Maybe<Pro_Emails_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
	/** unique or primary key constraint */
	UsersEmailKey = 'users_email_key',
	/** unique or primary key constraint */
	UsersPkey = 'users_pkey',
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
	created_at?: Maybe<Scalars['timestamptz']>;
	email?: Maybe<Scalars['String']>;
	first_name?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['String']>;
	last_name?: Maybe<Scalars['String']>;
	moments?: Maybe<Moments_Arr_Rel_Insert_Input>;
	pro_email?: Maybe<Pro_Emails_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
	__typename?: 'users_max_fields';
	created_at?: Maybe<Scalars['timestamptz']>;
	email?: Maybe<Scalars['String']>;
	first_name?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['String']>;
	last_name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
	created_at?: Maybe<Order_By>;
	email?: Maybe<Order_By>;
	first_name?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	last_name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
	__typename?: 'users_min_fields';
	created_at?: Maybe<Scalars['timestamptz']>;
	email?: Maybe<Scalars['String']>;
	first_name?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['String']>;
	last_name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
	created_at?: Maybe<Order_By>;
	email?: Maybe<Order_By>;
	first_name?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	last_name?: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
	__typename?: 'users_mutation_response';
	/** number of affected rows by the mutation */
	affected_rows: Scalars['Int'];
	/** data of the affected rows by the mutation */
	returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
	data: Users_Insert_Input;
	on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
	constraint: Users_Constraint;
	update_columns: Array<Users_Update_Column>;
	where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
	created_at?: Maybe<Order_By>;
	email?: Maybe<Order_By>;
	first_name?: Maybe<Order_By>;
	id?: Maybe<Order_By>;
	last_name?: Maybe<Order_By>;
	moments_aggregate?: Maybe<Moments_Aggregate_Order_By>;
	pro_email?: Maybe<Pro_Emails_Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
	id: Scalars['String'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Email = 'email',
	/** column name */
	FirstName = 'first_name',
	/** column name */
	Id = 'id',
	/** column name */
	LastName = 'last_name',
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
	created_at?: Maybe<Scalars['timestamptz']>;
	email?: Maybe<Scalars['String']>;
	first_name?: Maybe<Scalars['String']>;
	id?: Maybe<Scalars['String']>;
	last_name?: Maybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Email = 'email',
	/** column name */
	FirstName = 'first_name',
	/** column name */
	Id = 'id',
	/** column name */
	LastName = 'last_name',
}

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
	_eq?: Maybe<Scalars['uuid']>;
	_gt?: Maybe<Scalars['uuid']>;
	_gte?: Maybe<Scalars['uuid']>;
	_in?: Maybe<Array<Scalars['uuid']>>;
	_is_null?: Maybe<Scalars['Boolean']>;
	_lt?: Maybe<Scalars['uuid']>;
	_lte?: Maybe<Scalars['uuid']>;
	_neq?: Maybe<Scalars['uuid']>;
	_nin?: Maybe<Array<Scalars['uuid']>>;
};
