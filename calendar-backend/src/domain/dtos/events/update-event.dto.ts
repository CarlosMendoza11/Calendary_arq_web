export class UpdateEventDto {
    private constructor(
        public id: string,
        public title: string,
        public notes: string,
        public start: Date,
        public end: Date,
        public bgColor: string,
        public user: { id: string },
    ) { }

    static create(object: { [key: string]: any }): [string?, UpdateEventDto?] {
        const { title, notes, start, end, bgColor, user } = object.body;
        const { id } = object.params;

        if (!id) return ['Missing id'];
        if (!title) return ['Missing title'];
        if (!start) return ['Missing start'];
        if (!end) return ['Missing end'];
        if (!bgColor) return ['Missing bgColor'];
        if (!user?.id) return ['Missing user id'];

        return [undefined, new UpdateEventDto(
            id,
            title,
            notes,
            new Date(start),
            new Date(end),
            bgColor,
            user,
        )];
    }
}
