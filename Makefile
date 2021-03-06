export
	HTTP_PORT=3000
	JS_FILES=$(shell \
		find makefiles/ app/ test/ \
		-not -path $(JSHINT_CONFIG_FILE) \
		-not -path app/pages/common/js/airbrake-client.js \
		\( -name '*.js' -or -name '*.json' \) \
	)

default: deps lint

pre-commit: deps lint prepare-build clean-build server-restart

clean:
	rm -rf node_modules/ bower_components/ build/ .nvmrc package.json bower.json

include $(shell find makefiles -name '*.mk' | sort)
