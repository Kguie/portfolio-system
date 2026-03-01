package version

var (
	SHA       = ""
	BuildTime = ""
)

type Info struct {
	SHA       string `json:"sha"`
	BuildTime string `json:"buildTime"`
	Env       string `json:"env"`
}

func (i Info) WithDefaults() Info {
	if i.SHA == "" {
		i.SHA = "dev"
	}
	if i.BuildTime == "" {
		i.BuildTime = "dev"
	}
	if i.Env == "" {
		i.Env = "dev"
	}
	return i
}
