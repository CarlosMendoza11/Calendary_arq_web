export class CreateEventDto {
    private constructor(
        public title: string,
        public notes: string,
        public start: Date,
        public end: Date,
        public bgColor: string,
        public user: { id: string },
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateEventDto?] {
        const { title, notes, start, end, bgColor, user } = object;

        if (!title) return ['Missing title'];
        if (!start) return ['Missing start'];
        if (!end) return ['Missing end'];
        if (!bgColor) return ['Missing bgColor'];
        if (!user?.id) return ['Missing user id'];

        return [undefined, new CreateEventDto(
            title,
            notes,
            new Date(start),
            new Date(end),
            bgColor,
            user,
        )];
    }
}
